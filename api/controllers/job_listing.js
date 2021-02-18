'use strict';
    var db = require('../../config/db');
    module.exports = {getAll, save, getById, update, remove, getApplicantsByJobListingId, addApplicant, getApplicantById, updateApplicantStatus, removeApplicant};

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
    db.save(req.body)
    .then(res.json({success: 1, description: "Job listing added"}))
    .catch(err => {
        console.error(err);
        res.status(404).send();
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
    db.findJobListingById(req.swagger.params.id.value).then(jobListing => {
        if(jobListing) {
            res.json(jobListing);
        } else {
            res.status(404).send();    
        }
    }).catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

//PUT
function update(req, res, next) {
    db.update(req.swagger.params.id.value, req.body)
    .then(result => {
        if(result === 1) {
            res.json({success: 1, description: "Job listing updated"})
        } else {
            res.status(404).send();
        }
    })
    .catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

//DELETE
function remove(req, res, next) {
    db.remove(req.swagger.params.id.value)
    .then(result => {
        if(result === 1) {
            res.json({success: 1, description: "Job listing removed."})
        } else {
            res.status(404).send();    
        }
    })
    .catch(err => {
        res.status(404).send();
    });
}
/*
 *  ====================
 */

/*  ====================
 *  Path: /job-listings/{id}/applicants
 */
//GET
function getApplicantsByJobListingId(req, res, next) {
    db.getAllApplicantsForJobListing(req.swagger.params.id.value)
    .then(result => {
        if(result.length > 0) {
            res.json({applicants: result});
        } else {
            res.status(404).send();
        }
    }).catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

//POST
function addApplicant(req, res, next) {
    db.addApplicantForJobListing(req.swagger.params.id.value, req.body)
    .then(res.json({success: 1, description: "Applicant added"}))
    .catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

/*
 *  ====================
 */

 /*  ====================
 *  Path: /applicants/{id}
 */

//GET
function getApplicantById(req, res, next) {
    db.getApplicantById(req.swagger.params.id.value)
    .then(applicant => {
        if(applicant) {
            res.json(applicant);
        } else {
            res.status(404).send();    
        }
    })
    .catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

//PUT
function updateApplicantStatus(req, res, next) {
    db.updateApplicantById(req.swagger.params.id.value, req.body)
    .then(result => {
        if(result === 1) {
            res.json({success: 1, description: "Applicant updated"})
        } else {
            res.status(404).send();
        }
    })
    .catch(err => {
        console.error(err);
        res.status(404).send();
    });
}

//DELETE
function removeApplicant(req, res, next) {
    db.removeApplicantById(req.swagger.params.id.value)
    .then(result => {
        if(result === 1) {
            res.json({success: 1, description: "Applicant removed."})
        } else {
            res.status(404).send();    
        }
    })
    .catch(err => {
        res.status(404).send();
    });
}

 /*
 *  ====================
 */