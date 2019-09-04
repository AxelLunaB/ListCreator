// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
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

// const unitId = data.unitId;
//       const files = Array.from(data['data']);
//       const attachments = [];

//       if(files !== null) {

//         files.forEach(async file => {

//           if(isFileValid(file.type) && (unitId !== null || undefined)) {
  
//             let uploadParams = {
//               Bucket: 'giada-real/attachments',
//               Key: '',
//               ContentType: '',
//               Body: '',
//               ACL: 'bucket-owner-full-control'
//             };
    
//             try {
    
//               uploadParams.Body = file.body;
//               uploadParams.Key = file.name;
    
//               await s3.upload(uploadParams, async function (err, response) {
                
//                 if(err) {
//                   const error = new Error(`Error uploading file: ${file.name}`, err);
//                   error.httpStatusCode = 400;
//                   return next(error);
//                 }
    
//                 if(response) {
//                   console.log(`File ${file.name} uploaded sucessfully! URL: ${response.Location}`);
  
//                   // Generate attachment object
//                   // to insert data
//                   let attachment = {
//                     contentType: file.type,
//                     url: response.Location,
//                     size: file.size,
//                     unitId: unitId
//                   };
  
//                   // Push each attachment object
//                   // to attachments array
//                   attachments.push(attachment);
//                 }

//               });
    
//             } catch(e) {
//               console.log(e);
//             }
  
//           } else {
//             console.log(`File: ${file.name} is not a valid file.`);
//           }
  
//         });

//         // Send back to DB
//         data['data'] = attachments;
//         return data;
//       }

// eslint-disable-next-line no-unused-vars
module.exports = async function (context) {
    debugger
    const { data } = await context;
    const unitId = data.unitId;
    let attachment = {
        contentType: data['data'].type,
        url: '',
        size: data['data'].size.toString(),
        unitId: unitId
    };
    
    if(isFileValid(data['data'].type)) {
       
        let uploadParams = {
            Bucket: 'giada-real/attachments',
            Key: '',
            ContentType: '',
            Body: '',
            ACL: 'bucket-owner-full-control'
        };

        
            uploadParams.Body = data['data'].body;
            uploadParams.Key = data['data'].name;
                
            await s3.upload(uploadParams, async function (err, response) {
                            
                if(err) {
                    const error = new Error(`Error uploading file: ${data['data'].name}`, err);
                    error.httpStatusCode = 400;
                    return next(error);
                }
                
                if(response) {
                    console.log(`File ${data['data'].name} uploaded sucessfully! URL: ${response.Location}`);

                    attachment.url = response.Location.toString();
                    context.data = attachment;
                }

                return context;
            
            });
    }
};