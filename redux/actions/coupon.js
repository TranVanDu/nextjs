import api from '../../utils/api';
import {
    GET_LIST_COUPON
} from '../types';

export const getALLCoupon = (id) => (dispatch) => {

    return new Promise((resolve, reject) => {
        api
            .get(`/loyalty/listCoupon/${id}`)
            .then(res => {
                dispatch({ type: GET_LIST_COUPON, payload: res.data.data })
                resolve(res.data);
            })
            .catch(error => {
                reject(error.response);

            });
    });
};