const { authenticate } = require('@feathersjs/authentication').hooks;
// const setAttachment = require('../../hooks/set-attachment-object');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('src/aws-config.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const isFileValid = fileType => {
    let valid = false;
  
    switch(fileType) {
      case 'application/pdf':
        return valid = true;
  
      case 'image/jpeg':
        return valid = true
  
      case 'image/png':
        return valid = true
  
      default: 
        return valid
    }
};

const amazonUploadManager = async (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, response) {
      err ? reject(err) : resolve(response);
    });
  });
};

const getExtension = name => {
  const len = name.length;
  return name.slice(len - 4, len);
};

const formatAmazonKey = (unitId, customerId, documentType, name) => {
  return 'unit' + unitId.toString() + '_' + 'customer' +  customerId.toString() + '_' + documentType + getExtension(name);
};

const uploadAttachment = async context => {
  
  const { data } = context;
  const unitId = data.unitId;
  const customerId = 1;
  const documentType = data.docType;
  let attachment = {
    contentType: data['data'].type,
    url: '',
    size: data['data'].size.toString(),
    unitId: unitId,
    docType: documentType
  };

  if(isFileValid(attachment.contentType)) {

    let uploadParams = {
      Bucket: 'giada-real/attachments',
      Key: '',
      ContentType: '',
      Body: '',
      ACL: 'bucket-owner-full-control'
    };
    
    const fileName = data['data'].name;
    uploadParams.Body = data['data'].body;
    uploadParams.Key = formatAmazonKey(unitId, customerId, documentType, fileName);
    // uploadParams.Key = data['data'].name;
                
    const response = await amazonUploadManager(uploadParams);

    attachment.url = response.Location.toString();
    context.data = attachment;
  }

  return context;

};

module.exports = {
  before: {
    all: [/* authenticate('jwt') */],
    find: [],
    get: [],
    create: [
      async context => {
        context = await uploadAttachment(context);
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
    create: [
      context => {
        console.log(context.result);
        context.dispatch = 'File uploaded successfully';
        return context;
      }
    ],
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
