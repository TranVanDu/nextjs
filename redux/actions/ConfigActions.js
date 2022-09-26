import {
    GET_CONFIG,
} from '../types';
import { requestGetConfig } from '../../requests/config';

export const getConfig = () => dispatch => {
    return new Promise((resolve, reject) => {
        requestGetConfig().then(res => {
            dispatch({ type: GET_CONFIG, payload: res });
            resolve(res);
        }).catch(err => {
            reject(err);
            console.log(err);
        })
    })
}
