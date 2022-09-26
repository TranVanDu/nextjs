import api from '../../utils/api';
import qs from 'qs';
import {ALL_DESTINATION, GET_ABOUT_DESTINATION} from '../types';

export const getAllDestination = (filter = {}) => dispatch => {
    
    return new Promise((resolve, reject) => {
      api.get('/destination/app/list'
      ,{
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      }
      ).then(
        res => {
            
           dispatch({ type: ALL_DESTINATION, payload: res.data.data });
          resolve(res.data.data);
        }
      )
        .catch(error => {
          reject(error.response)
        })
    })
  }
export const getAll = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`/destination/load/${id}`).then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                console.log(err)
                reject(err.response);
            })
    })
}

export const getPopularSearch = () => {
    return new Promise((resolve, reject) => {
        api.get('/destination/app/list', {
            params: {
                paging: {
                    page: 1,
                    perpage: 9
                }
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data.data.list);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const getPopular = () => {
    return new Promise((resolve, reject) => {
        api.get('/booking/popular').then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}


export const getAboutDestination = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/destination/about/${id}`).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ABOUT_DESTINATION, payload: res.data.data });
        })
            .catch(err => {
                reject(err.response);
            })
    })
}