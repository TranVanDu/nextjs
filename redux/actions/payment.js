import api from '../../utils/api';
import {VERIFY_PAYMENT_TOKEN} from '../types';

export const confirmPm = (data) => {
    return new Promise((resolve, reject) => {
        api.post('/payment/execute', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err);
            })
    })
}

export const getOrder = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`/booking/detail/${id}`).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err);
            })
    })
}

export const verifyPaymentToken = (filter) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api.get('/client/payment/verifyToken', { params: filter }).then(response => {
            dispatch({ type: VERIFY_PAYMENT_TOKEN, payload: response.data.data });
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
} 