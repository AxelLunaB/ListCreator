import { getS3Signature } from '@/api';

const getAWSSignature = (context, files) => {
    return new Promise((resolve, reject) => {
      getS3Signature(files).then(res => {
        // context should be called to commit some mutation in order to send popups or something.
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
};

export default {
    getAWSSignature
}