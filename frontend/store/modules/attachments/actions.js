import { getS3Signature } from '@/api';

const getAWSSignature = (context, file) => {
  console.log('Current Object Sent');
  console.log(file);
    return new Promise((resolve, reject) => {
      getS3Signature(file).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
};

export default {
    getAWSSignature
}