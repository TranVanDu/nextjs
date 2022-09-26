import axios from 'axios';
import api from '../utils/api';

// const rootUrl = "http://210.211.99.55:9000";
// const username = "HPLAND";
// const password = "Hpland@#68";

// export const searchFlight = (data) => {
//     return new Promise((resolve, reject) => {
//         return axios.post(`${rootUrl}/AirData/ExtDOMSearchFlights`, {
//             Username: username,
//             Password: password,
//             Data: data
//         }).then(response => {
//             resolve(response.data);
//         }).catch(error => {
//             reject(error);
//         })
//     })
// }

export const searchFlight = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/flight/search`, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const bookFlight = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/flight/booking`, data).then(response => {
            console.log(response)
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}


export const getFareRuleInfo = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/flight/get-fare-rule-info`, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}
