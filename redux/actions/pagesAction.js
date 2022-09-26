import api from '../../utils/api';
import qs from 'qs';

export const getContent = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`/content/load/${id}`).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}