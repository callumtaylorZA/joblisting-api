'use strict';

var crypto = require('crypto');

module.exports = function() {
    return {
        // Job lising variable
        jobListingList : [],

        // Add a job listing to the job list
        save(jobListing) {
            jobListing.id = crypto.randomBytes(20).toString('hex');
            this.jobListingList.push(jobListing);
            return 1;
        },

        // Find a job listing in the job list
        find(id) {
            if(id) {
                return this.jobListingList.find(element => {
                    return element.id === id;
                });
            } else {
                return this.jobListingList;
            }
        },

        // Remove a job listing from the job list
        remove(id) {
            var found = 0;
            this.jobListingList = this.jobListingList.filter(element => {
                if(element.id === id) {
                    found = 1;
                } else {
                    return element.id !== id;
                }
            });
            return found;
        },

        // Update a job listing in the job list
        update(id, jobListing) {
            var jobListingIndex = this.jobListingList.findIndex(element => {
                return element.id === id;
            });
            if(jobListingIndex !== -1) {
                if(jobListing.title) {
                    this.jobListingList[jobListingIndex].title = jobListing.title;
                }
                if(jobListing.description) {
                    this.jobListingList[jobListingIndex].description = jobListing.description;
                }
                this.jobListingList[jobListingIndex].is_active = jobListing.is_active;
                return 1;
            } else {
                return 0;
            }
        }
    }
}