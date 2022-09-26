import {
    GET_ORDER_DETAIL
} from '../../types';
import { getOrderDetailByOrderNumber } from '../../requests/order';

export const getOrderDetailByOrderNumberAction = (orderNumber) => (dispatch) => {
    return new Promise((resolve, reject) => {
        getOrderDetailByOrderNumber(orderNumber).then(response => {
            dispatch({ type: GET_ORDER_DETAIL, payload: response.data.data });
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        });
    });
}