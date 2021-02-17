'use strict';

require('dotenv').config();
const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
    host:               process.env.DB_HOST,
    user:               process.env.DB_USER,
    password:           process.env.DB_PASSWORD,
    database:           process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit:    process.env.DB_CONNECTION_LIMIT
});

module.exports = { save, findJobListingById, getAllJobs, remove, update };
  
// Add a job listing to the job list
async function save(jobListing) { 
    return await connectionPool.execute("INSERT INTO `job-listings`(`title`, `description`, `is_active`) VALUES (?, ?, ?);", [jobListing.title, jobListing.description, jobListing.is_active]);
}

// Find a job listing in the job list
async function findJobListingById(id) {
    return await connectionPool.execute("SELECT id, title, description, IF(is_active, 'true', 'false') is_active FROM `job-listings` WHERE `id` = ? LIMIT 1;", [id]).then(jobListing => {
        return jobListing[0];
    });
}

//Get all job listings
async function getAllJobs() {
    return await connectionPool.execute("SELECT id, title, description, IF(is_active, 'true', 'false') is_active FROM `job-listings`;").then(jobListings => {
        return jobListings[0];
    });
}

// Remove a job listing from the job list
function remove(id) {
    return;
}

// Update a job listing in the job list
function update(id, jobListing) {
    return;
}