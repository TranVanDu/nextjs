import api from '../../utils/api';
import { GET_AUTOCOMPLETE } from '../types';

export const getAutocomplete = (keyword) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/booking/autocomplete?search=${keyword}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_AUTOCOMPLETE, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}