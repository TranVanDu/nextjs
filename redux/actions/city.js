import api from '../../utils/api';
import qs from 'qs';
import {
    GET_CITY_DETAIL,
    GET_POPULAR_PAKAGES,
    GET_POPULAR_ATTRACTION,
    GET_POPULAR_CITY_ESCAPE,
    GET_ELEMENT_CITY,
    SET_DEST_NAME,
    SEARCH_CITY_ACTIVITI,
    GET_POPULAR_ACTIVITI,
    GET_DETAIL_TICKET
} from '../types';

export const getCityDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/destination/load/${id}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_CITY_DETAIL, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getPopularPakages = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/popular/package/${id}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_POPULAR_PAKAGES, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getPopularAttraction = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/popular/attraction/${id}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_POPULAR_ATTRACTION, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getPopularCityEscape = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/popular/city_escape/${id}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_POPULAR_CITY_ESCAPE, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getElementCity = (filter = {}) => dispatch => {
    
    return new Promise((resolve, reject) => {
        api.get(`/booking/tours/${filter.id}`, {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ELEMENT_CITY, payload: res.data.data, dest_name: res.data.extra });
            dispatch({ type: SET_DEST_NAME, dest_name: res.data.extra });
        })
            .catch(err => {
                reject(err.response);
            })
    })
}


export const getPopularActivities = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/destination/activities/popular/${id}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_POPULAR_ACTIVITI, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const searchActivities = (k, id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/destination/activities/search/${id}?search=${k}`).then(res => {
            resolve(res.data.data);
            dispatch({ type: SEARCH_CITY_ACTIVITI, payload: res.data.data, k: k })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getTicketDetail = (id, user_id = "") => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/booking/ticket/detail/${id}`, {
            params: { user_id: user_id },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }).then(res => {
            resolve(res.data.data);
            dispatch({ type: GET_DETAIL_TICKET, payload: res.data.data })
        })
            .catch(err => {
                reject(err.response);
            })
    })
}





