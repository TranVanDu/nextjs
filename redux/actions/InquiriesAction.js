import api from '../../utils/api';

export const sendInquiry = data => {
    return new Promise((resolve, reject) => {
        api
            .post("/sendQuery", data)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
                console.log(error.response)
            });
    });
};