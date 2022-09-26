import api from '../../utils/api';
import qs from 'qs';
import {
    GET_AIRLINE
} from '../types';

export const getAirlineByTD = (tourID, desID) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/booking/airline/${tourID}?departure=${desID}`).then(res => {
            dispatch({ type: GET_AIRLINE, payload: res.data.data })
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}