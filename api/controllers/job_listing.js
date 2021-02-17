'use strict';
    var db = require('../../config/db');
    module.exports = {getAll, save, getById, update, remove};

/*  ===================
 *  Path: /job-listings
 */

//GET
function getAll(req, res, next) {
    db.getAllJobs().then(jobListings => {
        res.json({ job_listings: jobListings});
    }).catch(err => {
        console.error(err);
    });
}

//POST
function save(req, res, next) {
    db.save(req.body).then(res.json({success: "Success", description: "Job listing added"}))
    .catch(err => {
        console.error(err);
    });
}
/*
 *  ====================
 */

/*  ====================
 *  Path: /job-listings/{id}
 */

//GET
function getById(req, res, next) {
    var id = req.swagger.params.id.value;
    
    db.findJobListingById(id).then(jobListing => {
        jobListing.applicants = [];
        res.json(jobListing);
    }).catch(err => {
        console.error(err);
    });
}

//PUT
function update(req, res, next) {
    var id = req.swagger.params.id.value;
    var jobListing = req.body;
    if(db.update(id, jobListing)) {
        res.json({success: 1, description: "Job listing updated."});
    } else {
        res.status(404).send();
    }
}

//DELETE
function remove(req, res, next) {
    var id = req.swagger.params.id.value;
    if(db.remove(id)) {
        res.json({success: 1, description: "Job listing removed."});
    } else {
        res.status(204).send();
    }
}
/*
 *  ====================
 */