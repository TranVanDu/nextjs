import api from '../utils/api';

export const requestVerifyMail = (data) => {
    return new Promise((resolve, reject) => {
        api.post('/client/activate', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}