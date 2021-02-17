'use strict';
    var db = require('../../config/db');
    module.exports = {getAll, save, getById, update, remove};

/*  ===================
 *  Path: /job-listings
 */

//GET
function getAll(req, res, next) {
    console.log(db.getAllJobs());
    res.json({ job_listings: db.getAllJobs()});
}

//POST
function save(req, res, next) {
    res.json({success: db.save(req.body), description: "Job listing added"});
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
    db.find(id).then(result => console.log(result));

    console.log(jobListing);

    if(jobListing) {
        res.json({joblisting: jobListing});
    } else {
        res.status(204).send();
    }
}

//PUT
function update(req, res, next) {
    var id = req.swagger.params.id.value;
    var jobListing = req.body;
    if(db.update(id, jobListing)) {
        res.json({success: 1, description: "Job listing updated."});
    } else {
        res.status(204).send();
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