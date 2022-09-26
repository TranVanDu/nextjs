import api from '../../utils/api';
import { GET_USER_BY_TOKEN, LOGOUT, LOGIN } from '../types';
import { removeCookie } from '../../helpers/cookie';
import { requestLoginByToken, requestLogin } from '../../requests/auth';


export const login = (data, path) => dispatch => {

    return new Promise((resolve, reject) => {
        requestLogin(data, path).then(res => {
            resolve(res);
            dispatch({ type: LOGIN, payload: res.customer })
        })
            .catch(err => {
                reject(err);
            })
    })
}


export const loginByToken = () => dispatch => {
    return new Promise((resolve, reject) => {
        requestLoginByToken().then(data => {
            dispatch({ type: GET_USER_BY_TOKEN, payload: data.customer });
            resolve(data.customer);
        })
            .catch(err => reject(err))
    })
}


export const logout = () => dispatch => {
    removeCookie("2stay_web_token");
    dispatch({ type: LOGOUT })
    window.location.reload()
}

export const checkExistMail = (mail) => {
    return new Promise((resolve, reject) => {
        api.post('auth/existaccount', { email: mail }).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}


export const preResetMail = (data) => {
    return new Promise((resolve, reject) => {
        api.post('account/requestResetPassword', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}


export const confirmResetPass = (data) => {
    return new Promise((resolve, reject) => {
        api.post('/client/account/confirmResetPassword', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const checkExistPhoneVerify = (data, id) => {
    return new Promise((resolve, reject) => {
        api.post(`/verifyPhone/phone_valid/${id}`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const checkExistMailVerify = (data, id) => {
    return new Promise((resolve, reject) => {
        api.post(`account/verify/mail_valid/${id}`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const verifyMailProfile = (data, id) => {
    return new Promise((resolve, reject) => {
        api.post(`account/verifyEmail/${id}`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const verifyPhoneProfile = (data, id) => {
    return new Promise((resolve, reject) => {
        api.post(`account/verifyPhone/`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

