import api from '../utils/api';

export const wishlist = (id) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/wishlist`, { object_id: id, type: "STAY" }).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const checkWishlist = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/checkWishlist`, { params: { object_id: id, type: "STAY" } }).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const myWishlist = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/myWishlist`).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}