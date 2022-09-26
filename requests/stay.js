import api from '../utils/api';
var FileSaver = require('file-saver');

export const getNearByStay = (lat, lng) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/nearby?lat=${lat}&long=${lng}`).then(response => {
            // console.log(response, 'response')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const autocomplete = (str) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/autocomplete?search=${str}`).then(response => {
            // console.log(response, 'response for autocomplete')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getListStay = (filter) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/getListFilter`, { params: { ...filter } }).then(response => {
            // console.log(response, 'response for list')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getDataFilter = (filter) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/getFilterData`).then(response => {
            // console.log(response, 'response for data filter')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getDetailStay = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/detail/${id}`).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const nearbyUtil = (cords) => {
    return new Promise((resolve, reject) => {
        return api.get(`/nearest-places?lng=${cords.lng}&lat=${cords.lat}`).then(response => {
            // console.log(response, 'response for get near-by ulti property')
            resolve(response.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getRecommendStay = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/suggestion/${id}`).then(response => {
            // console.log(response, 'response for get get-recommendStay ulti property')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getRoomrate = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/getRoomrate/${id}`).then(response => {
            // console.log(response, 'response for get get-roomrate property')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getPrice = (id, query) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/price/${id}`, { params: { ...query } }).then(response => {
            // console.log(response, 'response for get get-price property')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getMaxRoom = (id, query) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/maxRoom/${id}`, { params: { ...query } }).then(response => {
            // console.log(response, 'response for get get-price property')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}


export const booking = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/stay/booking`, {
            ...data
        }).then(response => {
            // console.log(response, 'response for booking')
            resolve(response.data.data)
        }).catch(error => {
            reject(error.response);
        })
    })
}


export const detailBooking = (id) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/detailBooking/${id}`).then(response => {
            // console.log(response, 'response for detail booking')
            resolve(response.data.data)
        }).catch(error => {
            reject(error.response);
        })
    })
}

export const exportReceipt = (id) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/stay/exportReceipt`, { id: id }, {
            responseType: "blob"
        }).then(response => {
            let time_stamp = new Date().getTime();
            // Log somewhat to show that the browser actually exposes the custom HTTP header
            const fileNameHeader = "Content-Disposition";
            const suggestedFileName = response.headers[fileNameHeader];
            const effectiveFileName = (suggestedFileName === undefined
                ? `Booking_Receipt_${time_stamp}.pdf`
                : suggestedFileName);
            console.log("Received header [" + fileNameHeader + "]: " + suggestedFileName + ", effective fileName: " + effectiveFileName);
            // Let the user save the file.
            FileSaver.saveAs(response.data, effectiveFileName);
            // resolve(response.data.data)
        }).catch(error => {
            reject(error.response);
        })
    })
}

export const subscribeNews = (email) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/newsletter/subscribe`, {
            email: email
        }).then(response => {
            // console.log(response, 'response for detail booking')
            resolve(response.data.data)
        }).catch(error => {
            reject(error.response);
        })
    })
}