import axios from 'axios';
import { getCookie } from '../helpers/cookie';
import config from '../config';

const apiFormData = axios.create({
    baseURL: config.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
        // "Content-Disposition": "form-data"
    },
})

apiFormData.interceptors.request.use(function (config) {
    let accessToken = getCookie('2stay_web_token');
    if (accessToken) {
        config.headers.common['Authorization'] = "Bearer " + accessToken
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

apiFormData.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default apiFormData;


