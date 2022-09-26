import api from '../utils/api';
import qs from 'qs';

export const requestSearchAirport = (filter) => {
    filter = {
        ...filter,
        type: {
            type: '=',
            value: 'airport'
        }
    }
    return new Promise((resolve, reject) => {
        api.get('client/destination/list', {
            params: filter,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(response => {
            resolve(response.data.data.list)
        }).catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

//get district by place auto completed

export const requestGetDistrictByName = (filter) => {
    return new Promise((resolve, reject) => {
        api.get('client/destination/get_district_by_name', {
            params: filter,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error);
            reject(error.response)
        })
    })
}

export const requestSearchTransport = (data) => {
    return new Promise((resolve, reject) => {
        api.get('client/transfer/searchVehicle', {
            params: data,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

export const requestGetActiveAirport = () => {
    return new Promise((resolve, reject) => {
        api.get('client/transfer/listActiveAirport').then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

export const requestGetRouteDetail = (id) => {
    return new Promise((resolve, reject) => {
        api.get(`client/transfer/load/${id}`).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log("error", error);
            reject(error);
        })
    })
}

export const requestBookingTransport = (data) => {
    return new Promise((resolve, reject) => {
        api.post('client/transfer/booking', data).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error.response);
            reject(error.response);
        })
    })
}

export const requestListBookingTransport = (data = {}) => {
    return new Promise((resolve, reject) => {
        api.get('client/transfer/my-booking', {
            params: data,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error);
            reject(error.response);
        })
    })
}


export const requestOrderDetailTransport = (data) => {
    return new Promise((resolve, reject) => {
        api.get(`client/transfer/order-detail/${data}`).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error);
            reject(error.response);
        })
    })
}

export const requestCancelBookingTransport = (order_id) => {
    return new Promise((resolve, reject) => {
        api.post(`client/transfer/cancelBooking?order_id=${order_id}`).then(res => {
            resolve(res.data.data);
        }).catch(error => {
            console.log(error.response);
            reject(error.response);
        })
    })
}


