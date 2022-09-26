import api from '../utils/api';

export const triggerPusher = (channel, event, data) => {
    return new Promise((resolve, reject) => {
        api.post('/client/common/pusher/trigger', {
            channel: channel, 
            event: event, 
            data: data
        }).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}