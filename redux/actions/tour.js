import api from '../../utils/api';
import qs from 'qs';
import {
    GET_FILTER,
    GET_TOUR_BY_DESTID,
    GET_TOUR_DETAIL,
    SET_DEST_NAME,
    GET_TICKET_BY_DESTID,
    GET_CITY_ESCAPE_BY_DESTID
} from '../types';

export const getAll = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`/tour/load/${id}`).then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getFilter = (id, type) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`getfilter/${id}?type=${type}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_FILTER, payload: res.data.data });
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getListTourByDestId = (filter = {}) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/app/package', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_TOUR_BY_DESTID, payload: res.data.data.list, dest_name: res.data.extra, paging: res.data.data.paging })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const setDestName = (dest_name) => dispatch => {
    dispatch({ type: SET_DEST_NAME, dest_name: dest_name })
}

export const getTourDetail = (id, user_id) => dispatch => {

    return new Promise((resolve, reject) => {
        api.get(`/booking/load/${id}`, {
            params: { user_id: user_id }, paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {

            resolve(res.data.data);
            dispatch({ type: GET_TOUR_DETAIL, payload: res.data.data });
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getListCityEscape = (id, filter = { type: 1 }) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get(`booking/tours/${id}`, {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_CITY_ESCAPE_BY_DESTID, payload: res.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getListTicket = (id, filter = { type: 2 }) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get(`booking/tours/${id}`, {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_TICKET_BY_DESTID, payload: res.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

