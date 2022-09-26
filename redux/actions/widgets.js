import { LOAD_BY_CODE } from '../types';
import api from '../../utils/api';

export const getAll = (code) => {
    return new Promise((resolve, reject) => {
        api.get(`/widgets/loadWidget/${code}`).then(res => {
            resolve(res.data.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}