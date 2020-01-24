import { getS3Signature,
   getAttachments,
    deleteAttachment,
    deleteAllAttachments,
    getAttachmentsCustomer,
    createNewAttachment
   } from '@/api';

const getAWSSignature = (context, file) => {
    return new Promise((resolve, reject) => {
      getS3Signature(file).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
};

const getAttachmentsByUnit = (context, unitId) => {
  return new Promise((resolve, reject) => {
    getAttachments(unitId).then(res => {
      context.commit('ATTACHMENTS_BY_UNIT', res);
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const createAttachmentWithData = (context, attachment) => {
  return new Promise((resolve, reject) => {
    createNewAttachment(attachment).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const getAttachmentsByCustomer = (context, customerId) => {
  return new Promise((resolve, reject) => {
    getAttachmentsCustomer(customerId).then(res => {
      context.commit('ATTACHMENTS_BY_USER', res);
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const deleteFile = (context, data) => {
  return new Promise((resolve, reject) => {
    deleteAttachment(data).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

const deleteAllFiles = (context, data) =>{
  return new Promise((resolve, reject) => {
    deleteAllAttachments(data).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

export default {
  getAWSSignature,
  getAttachmentsByUnit,
  getAttachmentsByCustomer,
  deleteFile,
  deleteAllFiles,
  createAttachmentWithData,
}
