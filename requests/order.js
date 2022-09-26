import api from '../utils/api';

export const getOrderDetailByOrderNumber = (orderNumber) => {
    return new Promise((resolve, reject) => {
        return api.get(`client/orders/detail`, { params: { orderNumber: orderNumber } }).then(response => {
            console.log(response)
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const verifyPaymentToken = (filter) => {
    return new Promise((resolve, reject) => {
        return api.get('/client/payment/verifyToken', { params: filter }).then(response => {
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const getFlightOrderDetail = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/flight/order/${id}`).then(response => {
            console.log(response.data.data);
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}

export const getPolicyCancel = (id) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/stay/checkPolicyCancel`, { order_id: id }).then(response => {
            console.log(response.data.data);
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}

export const cancelBooking = (id) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/stay/cancelBooking`, { order_id: id }).then(response => {
            console.log(response.data.data);
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}

export const processFreeOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/orders/process-free-order`, { order_id: orderId }).then(response => {
            console.log(response)
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const uploadProofOfPayment = (id, data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/orders/${id}/proof`, data).then(response => {
            console.log(response.data.data);
            resolve(response.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}