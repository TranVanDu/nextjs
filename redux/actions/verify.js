import api from '../../utils/api';

export const verifyMail = (data) => {
    return new Promise((resolve, reject) => {
        api.post('/activate', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}