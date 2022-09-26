import api from '../utils/api';
import qs from "qs";

export const requestGetListNoti = (filter) => {
    return new Promise((resolve, reject) => {
        api.get(`/client/notification/myNotifications`, {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const subscribe = (data) => {
    return new Promise((resolve, reject) => {
        api.post(`/client/notification/subscribe`, data).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}