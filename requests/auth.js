import api from '../utils/api';
import { removeCookie, setCookie } from '../helpers/cookie';


export const requestLogin = (data, path) => {
    return new Promise((resolve, reject) => {
        api.post(`/${path}`, data).then(res => {
            resolve(res.data.data);
            setCookie("2stay_web_token", res.data.data.token, 7);
        })
            .catch(err => {
                reject(err.response);
                console.log(err.response)
            })
    })
}


export const requestLoginByToken = () => {
    return new Promise((resolve, reject) => {
        api.get('client/auth').then(res => {
            resolve(res.data.data);
        }).catch(err => {
            reject(err.response);
            if (window.console) {
                console.clear();
            }
        })
    })
}

export const requestChangePassword = (data) => {
    return new Promise((resolve, reject) => {
        api.post('client/account/changePassword', data).then(res => {
            resolve(res.data);
            removeCookie("2stay_web_token");
        })
            .catch(err => {
                reject(err.response);
            })
    })
}

export const logout = () => dispatch => {
    removeCookie("2stay_web_token");
    dispatch({ type: LOGOUT })
    window.location.reload()
}

export const requestCheckExistMail = (mail) => {
    return new Promise((resolve, reject) => {
        api.post('client/auth/validateEmail', { email: mail }).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
            })
    })
}


export const requestResetPassword = (data) => {
    return new Promise((resolve, reject) => {
        api.post('client/account/resetPassword', data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                console.log(err)
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

export const requestCheckExistPhoneVerify = (data, id) => {
    return new Promise((resolve, reject) => {
        api.post(`/verifyPhone/phone_valid/${id}`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
                console.log("err", err.response)
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

export const requestVerifyMailProfile = (data) => {
    return new Promise((resolve, reject) => {
        api.post(`/client/account/verifyEmail`, data).then(res => {
            resolve(res.data);
        })
            .catch(err => {
                reject(err.response);
                console.log(err)
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

