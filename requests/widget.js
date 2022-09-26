import axios from 'axios';
import api from '../utils/api';

export const getWidget = (type) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/widgets/loadWidget/${type}`).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getHomepageWidgets = () => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/homepage-widgets`).then(response => {
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const getBlogCategories = () => {
    return new Promise((resolve, reject) => {
        return axios.get(`https://2stay.vn/blog/wp-json/wp/v2/categories`).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error);
        })
    })
}