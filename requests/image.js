import API_URL from '../config';
import axios from 'axios';

export const uploadImages = (data) => {
    return new Promise((resolve, reject) => {
        return axios(API_URL + `client/media/uploadFile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;',
                // "Content-Disposition": "form-data"
            },
            data: data
        }).then((result) => {
            console.log(result);
            resolve(result.data.data);
        }).catch((err) => {
            console.log(err.response);
            reject(err);
        });
    });
};