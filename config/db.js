'use strict';

require('dotenv').config();
const e = require('express');
const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
    host:               process.env.DB_HOST,
    user:               process.env.DB_USER,
    password:           process.env.DB_PASSWORD,
    database:           process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit:    process.env.DB_CONNECTION_LIMIT
});

module.exports = { save, findJobListingById, getAllJobs, remove, update, getAllApplicantsForJobListing, addApplicantForJobListing, getApplicantById, updateApplicantById, removeApplicantById};
  
// Add a job listing to the job list
async function save(jobListing) { 
    return await connectionPool.execute("INSERT INTO `job-listings`(`title`, `description`, `is_active`) VALUES (?, ?, ?);", [jobListing.title, jobListing.description, jobListing.is_active])
    .catch(err => {
        console.error(err);
    });
}

// Find a job listing in the job list
async function findJobListingById(id) {
    var jobListing = {};

    return await Promise.all([
        connectionPool.execute("SELECT id, title, description, IF(is_active, 'true', 'false') is_active FROM `job-listings` WHERE `id` = ? LIMIT 1;", [id])
        .then(result => {
            jobListing = result[0][0];
        }),
        getAllApplicantsForJobListing(id)
        .then(result => {
            jobListing.applicants = result;
        })
    ]).then(function() {
        return jobListing;
    })
    .catch(err => {
        console.error(err);
    });
}

//Get all job listings
async function getAllJobs() {
    return await connectionPool.execute("SELECT id, title, description, IF(is_active, 'true', 'false') is_active FROM `job-listings`;")
    .then(jobListings => {
        return jobListings[0];
    })
    .catch(err => {
        console.error(err);
    });
}

// Remove a job listing from the job list
async function remove(id) {
    return await connectionPool.execute("DELETE FROM `job-listings` WHERE (`id` = ?);", [id])
    .then(result => {
        if(result[0].affectedRows > 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .catch(err => {
        console.error(err);
    });
}

// Update a job listing in the job list
async function update(id, jobListing) {
    if(!jobListing.title) {
        jobListing.title = null;
    }
    if(!jobListing.description) {
        jobListing.description = null;
    }
    if(!jobListing.is_active) {
        jobListing.is_active = null;
    }

    return await connectionPool.execute("UPDATE `job-listings` SET `title` = IF(? is not null and length(?) > 0, ?, `title`), `description` = IF(? is not null and length(?) > 0, ?, `description`), `is_active` = IF(? is not null and length(?) > 0, ?, `is_active`) WHERE (`id` = ?);",
        [jobListing.title, jobListing.title, jobListing.title, jobListing.description, jobListing.description, jobListing.description, jobListing.is_active, jobListing.is_active, jobListing.is_active, id])
    .then(result => {
        if(result[0].affectedRows > 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .catch(err => {
        console.error(err);
    });
}

//Get all applicants for a job listing by id
async function getAllApplicantsForJobListing(jobListing_id) {
    return await connectionPool.execute("SELECT T2.id, T2.name, T2.surname, T2.email, T2.cell_no, T1.status FROM `job-listings-db`.`applicant-status` T1 INNER JOIN `applicants` T2 ON T1.`applicant_id` = T2.`id` WHERE T1.`job_listing_id` = ?;", [jobListing_id])
    .then(applicants => {
        return applicants[0];
    })
    .catch(err => {
        console.error(err);
    });
}

//Add an applicant for a particular job listing
async function addApplicantForJobListing(jobListing_id, applicant) {
    return await connectionPool.execute("INSERT INTO `applicants`(`name`, `surname`, `email`, `cell_no`, `document`) VALUES (?, ?, ?, ?, ?);", [applicant.name, applicant.surname, applicant.email, applicant.cell_no, applicant.document])
    .then(result => {
        connectionPool.execute("INSERT INTO `applicant-status`(`job_listing_id`, `applicant_id`) VALUES(?, ?);", [jobListing_id, result[0].insertId])
        .catch(err => {
            console.error(err);
        })
    })
    .catch(err => {
        console.error(err);
    });
}

//Get an applicant by id
async function getApplicantById(applicant_id) {
    return await connectionPool.execute("SELECT T2.id, T2.name, T2.surname, T2.email, T2.cell_no, T1.status FROM `job-listings-db`.`applicant-status` T1 INNER JOIN `applicants` T2 ON T1.`applicant_id` = T2.`id` WHERE T2.`id` = ? LIMIT 1;", [applicant_id])
    .then(result => {
        return result[0][0];
    }).catch(err => {
        console.error(err);
    });
}

//Update the status of an applicant
async function updateApplicantById(applicant_id, update) {
    return await connectionPool.execute("UPDATE `applicant-status` SET `status` = ? WHERE (`applicant_id` = ?);", [update.status, applicant_id])
    .then(result => {
        if(result[0].affectedRows > 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .catch(err => {
        console.error(err);
    });
}

//Remove an applicant by id
async function removeApplicantById(applicant_id) {
    return await connectionPool.execute("DELETE FROM `applicants` WHERE (`id` = ?);", [applicant_id])
    .then(result => {
        if(result[0].affectedRows > 0) {
            return 1;
        } else {
            return 0;
        }
    })
    .catch(err => {
        console.error(err);
    });
}