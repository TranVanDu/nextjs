import api from '../../utils/api';

export const triggerPusher = (channel, event, data) => dispatch => {
    api.post('/common/pusher/trigger', {
        channel: channel, 
        event: event, 
        data: data
    }).then(response => {
        
    }).catch(err => {

    })
}