import api from '../utils/api';
export const checkCoupon = (code, type) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/coupon/check`, {
            code: code,
            type: type
        }).then(response => {
            // console.log(response, 'response for get get-price property')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const requestGetMyCoupon = (status) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/coupon/my-coupon?status=${status}`).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}