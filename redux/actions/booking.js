import api from '../../utils/api';

import {
    BOOKING, BOOKING_TICKET
} from '../types';

export const booking = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api.post('/booking/book', data)
            .then(res => {
                dispatch({ type: BOOKING, payload: res.data.data })
                resolve(res.data.data);
                console.log(res.data)
            })
            .catch(error => {
                reject(error.response);
                console.log(error.response)
            });
    });
};

export const getPayment = (order_id, method) => {
    return new Promise((resolve, reject) => {
        api.post('payment/pre', {
            method: method,
            order_id: order_id,
        })
        .then(res => {
            resolve(res.data.data)
            console.log(res.data)
        })
        .catch(err => {
            reject(err.response)
            console.log(error.response)
        })
    })
}

export const bookingTicket = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api.post('/ticket/book', data)
            .then(res => {
                dispatch({ type: BOOKING_TICKET, payload: res.data.data })
                resolve(res.data.data);
                console.log(res.data)
            })
            .catch(error => {
                reject(error.response);
                console.log(error.response)
            });
    });
};