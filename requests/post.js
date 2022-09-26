import axios from 'axios';

export const getHomepageBlogPosts = () => {
    return new Promise((resolve, reject) => {
        return axios.get('https://2stay.vn/blog/wp-json/wp/v2/posts?&per_page=6&offset=0&categories_exclude=22').then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const getTipsForHost = () => {
    return new Promise((resolve, reject) => {
        return axios.get('https://2stay.vn/blog/wp-json/wp/v2/posts?&per_page=6&offset=0&categories=22').then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}