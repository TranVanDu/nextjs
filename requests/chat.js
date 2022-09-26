import api from '../utils/api';
import qs from 'qs'

export const getMessages = (id, paging) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/chat/messages/${id}`, {
            params: { paging: paging },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(response => {
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const myBookingConversation = () => {
    return new Promise((resolve, reject) => {
        return api.get(`client/chat/myReservationConversations`, {
            params: {
                user: 1
            }
        }).then(response => {
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const myConversation = () => {
    return new Promise((resolve, reject) => {
        return api.get(`client/chat/myConversations`).then(response => {
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const sendMessage = (data) => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/chat/send`, data).then(response => {
            console.log(response)
            resolve(response.data.data);
        }).catch(error => {
            reject(error);
        })
    })
}