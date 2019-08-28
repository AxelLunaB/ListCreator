const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('src/aws-config.json');
AWS.config.update({
  accessKeyId: 'AKIA3SGGPIK2YT63QC57',
  secretAccessKey: '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'
});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// new AWS.Credentials({ "accessKeyId": "AKIA3SGGPIK2YT63QC57", "secretAccessKey": "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", "region": "us-east-2" });

const date = new Date().toISOString();
const dateString = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);

// HMAC encryption algorithm used to encrypt everything in the request
const encryptationAlgorithm = 'sha256';
const key = "AR3D-GIADA";

const getDate = function () {
  const TIME_TO_EXPIRE_IN_MINUTES = 15;
  const date = moment().minutes(TIME_TO_EXPIRE_IN_MINUTES);
  const dateObj = new Date(date);
  const expiration = dateObj.toISOString();

  return expiration;
};

const amazonCredentialPath = function (dateString) {
  return "AKIA3SGGPIK2ZLATPELT" + "/" + dateString + "/" + "us-east-2" + "/s3/aws4_request";
};

const constructPolicy = credentialPath => {
  const expiration = getDate();
  const policy = {
    "expiration": expiration,
    "conditions": [
      { "acl": "bucket-owner-full-control" },
      { "bucket": "giada-real/attachments" },
      ["content-length-range", 1048579, 10485760],
      { "success_action_status": "201" },
      { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
      { "x-amz-credential": credentialPath },
      { "x-amz-date": dateString + "T000000Z" }
    ]
  };

  return policy;
};

const encryptHmac = (key, string) => {
  const hmac = crypto.createHmac(encryptationAlgorithm, key);
        hmac.end(string);

        return hmac.read();
};

const s3UploadSignature = policyBase64 => {
  const dateKey = encryptHmac("AWS4" + "1z5Vb76T32SAOq/q20EubSK0HDsqSC6gqnfL1pp5", dateString);
  const dateRegionKey = encryptHmac(dateKey, "us-east-2");
  const dateRegionServiceKey = encryptHmac(dateRegionKey, "s3");
  const signingKey = encryptHmac(dateRegionServiceKey, "aws4_request");

  return encryptHmac(signingKey, policyBase64).toString('hex');
};

const getS3FormParameters = function () {
  const credentialPath = amazonCredentialPath(dateString);
  const policy = constructPolicy(credentialPath);
  const policyBase64 = new Buffer(JSON.stringify(policy).toString('base64'));
  const signature = s3UploadSignature(policyBase64);

  return {
    "acl": "bucket-owner-full-control",
    "success_action_status": "201",
    "policy": policyBase64,
    "x-amz-algorithm": 'AWS4-HMAC-SHA256',
    "x-amz-credential": credentialPath,
    "x-amz-date": dateString + "T000000Z",
    "x-amz-signature": signature
  }
};

/* eslint-disable no-unused-vars */
class Service {
    constructor(options) {
      this.options = options || {};
    }
    setup(app) {
      this.app = app;
    }
  
    async find(params) {
        
    }
  
    async get(id, params) {
      return {
        id, text: `A new message with ID: ${id}!`
      };
    }
  
    async create(data, params) {

      const files = data;

      if(!files) {
        const error = new Error('Please upload a file.');
        error.httpStatusCode = 400;
        return next(error);
      }

      const fileArray = [];
      fileArray.push(files);

      const file = fileArray[0]['0'];

      let uploadParams = {
        Bucket: 'giada-real/attachments',
        Key: '',
        ContentType: `${file.content}`,
        Body: '',
        ACL: 'bucket-owner-full-control'
      };

      const readStream = fs.createReadStream(file.path);

      readStream.on('error', err => {
        console.log('File Error!', err);
      });

      try {
        uploadParams.Body = readStream;
        uploadParams.Key = 'Testing.pdf';

        s3.upload(uploadParams, function (err, response) {
          if(err) {
            console.log('Error: ', err);
          }

          if(response) {
            console.log(`File uploaded sucessfully! URL: ${response.Location}`);
          }
        });

      } catch(e) {
        console.log(e);
      }
    }
  
    async update(id, data, params) {
      return data;
    }
  
    async patch(id, data, params) {
      return data;
    }
  
    async remove(id, params) {
      return { id };
    }
  
  }
  
  module.exports = function (options) {
    return new Service(options);
  };
  
  module.exports.Service = Service;