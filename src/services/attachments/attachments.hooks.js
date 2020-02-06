const { authenticate } = require('@feathersjs/authentication').hooks;
// const setAttachment = require('../../hooks/set-attachment-object');

const propesctoGuide = require('../../hooks/guia-prospecto-pdf');


// Amazon Methods
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
  if(customerId === null) { customerId = '000' }
  console.log('Format Amazon Key Method');
  console.log(`UnitId: ${unitId}, CustomerId: ${customerId !== null || customerId !== undefined ? customerId : '000' }, Document Type: ${documentType}`);
  return 'Residencia' + unitId.toString() + '-' + 'Cliente' +  customerId.toString() + '-' + new Date() + documentType + getExtension(name);
};
/*
const uploadAttachment = async context => {

  const { data } = context;
  const unitId = data.unitId;
  const documentType = data.docType;
  const size = data.size.toString();

  console.log('File Size');
  console.log(size);

  let customerId = data.customerId === undefined ? '000' : data.customerId;

   await context.app.service('/api/contracts').find({ query: { $limit: 1, unitId: unitId } }).then(contract => {
    const { data } = contract;

    if(data[0]) {
      customerId = data[0].customerId;
    }

  });

  let attachment = {
    contentType: data['data'].type,
    url: '',
    size: size,
    unitId: unitId,
    customerId: customerId === '000' ? null : customerId,
    docType: documentType
  };

  if(isFileValid(attachment.contentType)) {

    let uploadParams = {
      Bucket: 'sibaria-web/attachments',
      Key: '',
      ContentType: '',
      Body: '',
      ACL: 'public-read'
    };

    const fileName = data['data'].name;
    uploadParams.Body = data['data'].body;
    uploadParams.Key = formatAmazonKey(unitId, customerId, documentType, fileName);

    const response = await amazonUploadManager(uploadParams);

    attachment.url = response.Location.toString();
    context.data = attachment;
  }

  return context;
};
*/
const getType = docType => {

  switch(docType) {
    case 'application/pdf':
      return '.pdf';

    case 'image/png':
      return '.png';

    case 'image/jpeg':
      return '.jpg';
  }
};

const deleteAttachment = context => {

  if(typeof context.id === 'object') {


    return new Promise(async (resolve, reject) => {
      const { id } = context;
      let customerId = '000';


      // First we need the customer ID that belongs to the Unit
      await context.app.service('/api/contracts').find({ query: { $limit: 1, unitId: id.unitId } }).then(contract => {
        const { data } = contract;

        if(data[0]) {
          customerId = data[0].customerId;
        }

      });

      // Then we have to generate the Amazon Key
      const key = formatAmazonKey(id.unitId, customerId, id.docType, getType(id.contentType));

      const params = {
        Bucket: "sibaria-web/attachments",
        Key: key
      };

       s3.deleteObject(params, function(err, res) {
        if(err) {
          reject(err);
        }

        if(res) {
          context.id = id.id;
          resolve(context);
        }
       });
    });

  } else {
    return context;
  }
};

module.exports = {
  before: {
    all: [/* authenticate('jwt') */],
    find: [],
    get: [],
    create: [
      async context => {
        let newId = await context.app.service('attachments').find({query: {$limit: 1,$sort: {id: -1} }});
        
        if(newId.total !== 0) {
          context.data.id = newId.data[0].id + 1;
        }


        const docType = context.data.type;

        let info = context.data

        if(context.data.trial) {
          delete context.data.trial
          delete context.data.id
          return context
        }

        // Check what type of Attachment user
        // wants to retrieve / create
        switch(docType) {
          case "Propescto Guide":
            const pdfGuide = await propesctoGuide(context);

            // Upload to Amazon S3 Bucket
            let uploadParamsStatement = {
              Bucket: 'sibaria-web/attachments',
              Key: `unit${info.info.unitId}-customer${info.info.customerId}-Prospecto_Guide.pdf`,
              ContentType: 'application/pdf',
              Body: pdfGuide.data.pdf,
              ACL: 'public-read'
            };

             // Upload to Amazon Bucket
             await amazonUploadManager(uploadParamsStatement).then(response => {

              // Send Attachment to Attachments Table
              let attachment = {
                contentType: 'application/pdf',
                url: response.Location.toString(),
                size: pdfGuide.data.pdf.byteLength,
                unitId: null,
                customerId: null,
                docType: 'Propescto Guide',
                userId: 1,
                unitId:info.info.unitId,
                customerId:info.info.customerId
              };

              context.data = attachment;
              return context;

            }).catch(error => {
              context.result = error;
              return context;
            });

            break;

          default:

            // This Switch Case is used for every file upload
            // So every file (Official ID, Proof of Address, etc)
            // will enter this Switch Case
            const { data } = context;
            console.log('data is:', data);
            const unit = data.unitId;
            const customer = data.customerId;
            const contentType = data.data.type;
            const body = data.data.body;
            const document = data.docType;
            const size = data.data.size;
            const extension = getType(contentType);

            // After generating a Lease Contract
            // Upload to Amazon S3 Bucket
            let fileParams = {
              Bucket: 'sibaria-web/attachments',
              Key: `Unit${unit}-Customer${customer}-${document}${extension}`,
              ContentType: contentType,
              Body: body,
              ACL: 'public-read'
            };

            // Upload to Amazon Bucket
            await amazonUploadManager(fileParams).then(response => {

              // Send Attachment to Attachments Table
              let attachment = {
                contentType: contentType,
                url: response.Location.toString(),
                size: size.toString(),
                unitId: unit,
                customerId: customer,
                docType: document
              };

              console.log("success");
              context.data = attachment;
              return context;

            }).catch(error => {
              context.result = error;
              return context;
            });

            break;
        }
      }
    ],
    update: [],
    patch: [],
    remove: [

    ]
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
