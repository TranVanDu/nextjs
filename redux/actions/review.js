import api from '../../utils/api';

export const getAllReview = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`/booking/load/${id}`).then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}