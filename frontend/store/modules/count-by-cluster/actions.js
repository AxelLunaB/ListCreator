import { fetchCountByCluster } from '@/api';

const getCountByCluster = (context, cluster) => {
    return new Promise((resolve, reject) => {
      fetchCountByCluster(cluster).then(res => {
        // context should be called to commit some mutation in order to send popups or something.
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
};

export default {
    getCountByCluster
}