const { authenticate } = require('@feathersjs/authentication').hooks;
const AWS = require('aws-sdk');
new AWS.Credentials({ "accessKeyId": "AKIA3SGGPIK2YT63QC57", "secretAccessKey": "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", "region": "us-east-2" });
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

/* authenticate('jwt') */

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {

        // AWS.config.loadFromPath('src/aws-config.json');
        

        let myKey = 'file.json';
        
        let params = {
          Bucket: 'giada-real/attachments',
          Key: myKey,
          ContentType: 'application/json',
          Body: '{data: "Hello", process: 300}',
        };

        try {
          s3.upload(params, function (err, response) {
            if (err) {
              console.log(err);
            }
            console.log(response);
            const textResponse = 'Successfully uploaded data';
            console.log(textResponse);
          });
        } catch (e) {
          console.log('Not working... ' + e);
        }

      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
