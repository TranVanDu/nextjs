import api from '../utils/api';

export const createReview = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/review/createReview`, data).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err);
        });
    });
}

export const getMyReviews = (type) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/review/myreview/${type}`).then((result) => {
            resolve(result.data.data.list);
        }).catch((err) => {
            reject(err);
        });
    });
}
