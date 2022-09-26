import api from '../utils/api';


export const requestGetConfig = () => {

    return new Promise((resolve, reject) => {
        api.get('/common/getConfigClient').then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
                console.log(err.response)
            })
    })
}