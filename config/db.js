'use strict';

const mysql = require("mysql2");
const crypto = require('crypto');
const { isRegExp } = require("util");

const dbHost = '164.90.131.225';
const dbUser = 'admin';
const dbPassword = ',F}]kKVVF7{+~i37';
const dbName = 'job-listings-db';
const dbConnectionLimit = 5;

const connectionPool = mysql.createPool({
    host:       dbHost,
    user:       dbUser,
    password:   dbPassword,
    database:   dbName,
    waitForConnections: true,
    connectionLimit: dbConnectionLimit
});

module.exports = { save, find, getAllJobs, remove, update };
  
// Add a job listing to the job list
function save(jobListing) {
    const query = "INSERT INTO `job-listings`(`title`, `description`, `is_active`)" + 
    "VALUES ('" + jobListing.title + "', '" + jobListing.description + "', " + jobListing.is_active + ");"

    connectionPool.execute(query,
        (error, results, fields) => {
            if(error) {
                console.error('error executing the query');
                return 0;
            }
        }
    );
    return 1;
}

// Find a job listing in the job list
function find(id) {
    const query = "SELECT * FROM `job-listings-db`.`job-listings` WHERE `id` = " + id + " LIMIT 1;";

    connectionPool.execute(query,
        function (error, results, fields) {
            if(error) {
                console.error('error executing the query');
                return 0;
            }
            return results;
        }
    );
}

//Get all job listings
function getAllJobs() {
    const query = "SELECT * FROM `job-listings-db`.`job-listings`;";
    var jobListings = [];

    connectionPool.execute(query,
        function (error, results, fields) {
            if(error) {
                console.error('error executing the query');
                return 0;
            }
            return results;
        }
    );
}

// Remove a job listing from the job list
function remove(id) {
    return;
}

// Update a job listing in the job list
function update(id, jobListing) {
    return;
}