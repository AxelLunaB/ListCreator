import { newFileUpload } from '@/api';

const setNewAttachment = (context, attachment) => {
    return new Promise((resolve, reject) => {
      newFileUpload(attachment).then(res => {
        // context should be called to commit some mutation in order to send popups or something.
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
};

export default {
    setNewAttachment
}