
import cookie from '@/utils/cookie';
import socket from '@/io';

/* AUTHENTICATION */
const authenticateSocket = () => {
  return new Promise((resolve, reject) => {
    const params = { strategy: "jwt", accessToken: cookie() };
    socket.emit("authenticate", params, function (message, data) {
      //message should be null.
      // console.log(data);
      // console.log(message);
      if (message != null || message != undefined) {
        reject();
      } else {
        resolve();
      }
    });
  })
};


const currentUser = () => {
  return new Promise((resolve, reject) => {
    socket.emit('find', 'users', { current: 'true' }, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user)
      }
    });
  });
};




export {
  authenticateSocket,
  currentUser
}
