import api from '../utils/api';


export const getMyAutocompleteAddress = (address) => {
    return new Promise((resolve, reject) => {
        return api.get(`/getAutocompleteAddress?address=${address}`).then(response => {
            resolve(response.data.predictions);
        }).catch(error => {
            reject(error);
        })
    })
}

export const getPlace = (placeid) => {
    return new Promise((resolve, reject) => {
        return api.get(`/getPlaceDetail?placeid=${placeid}`).then(response => {
            resolve(response.data.result);
        }).catch(error => {
            reject(error);
        })
    })
}