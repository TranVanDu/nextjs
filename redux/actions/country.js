import { GET_ALL_COUNTRY, GET_ALL_DES_AU } from '../types';
import qs from 'qs';
import api from '../../utils/api';

export const getAllCountry = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/country/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            dispatch({ type: GET_ALL_COUNTRY, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}


export const getAllDestinationInAustralia = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api
            .get(`/destination/list`, {
                params: {
                    country_id: {
                        type: '=',
                        value: 15,
                    },
                    paging: 0,
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'repeat' });
                },
            })
            .then(async data => {
                resolve(data.data.data.list);
                dispatch({ type: GET_ALL_DES_AU, payload: data.data.data.list })
            })
            .catch(error => {
                console.log('error', error);
                reject(error);
            });
    });
};