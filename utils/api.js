import axios from 'axios';
import { removeCookie, getCookie } from '../helpers/cookie';
import config from '../config';
import { message } from 'antd';

const api = axios.create({
    baseURL: config.API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    }
})

api.interceptors.request.use(function (config) {
    let accessToken = getCookie('2stay_web_token');
    if (accessToken) {
        config.headers.common['Authorization'] = "Bearer " + accessToken
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error && error.response && error.response.status === 401) {
            removeCookie('2stay_web_token');

            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        } else {
            // message.error("Đã có lỗi xảy ra. Vui lòng thử lại.")
        }
        return Promise.reject(error);
    }
);

export default api;

