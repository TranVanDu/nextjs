import api from '../utils/api';
import qs from "qs";
import apiformData from '../utils/apiFormData';


export const requestUpdateAvatar = (data) => {

    return new Promise((resolve, reject) => {
        apiformData
            .post('client/account/updateAvatar', data)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                console.log("err", error)
                reject(error.response);
            })
    })
}


export const getMyBooking = (type) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/account/my-booking?type=${type}`).then(res => {
            // console.log(res.data)
            resolve(res.data.data)
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}


export const requestUpdateUserInformation = data => {

    return new Promise((resolve, reject) => {
        api
            .post("/client/account/updateProfile", data)
            .then(res => {
                resolve(res.data.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};




export const loadRuleInviteFriendSignUp = () => {
    return new Promise((resolve, reject) => {
        api
            .get('client/loyalty/rule/load/INVITE_FRIEND_SIGNUP')
            .then(res => {
                resolve(res.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


export const getMyStayBookings = (filter) => {
    return new Promise((resolve, reject) => {
        return api.get(`/client/stay/myBooking`).then(response => {
            // console.log(response, 'response for get my bookings')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}


export const becomeHost = () => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/stay/becomeHost`).then(response => {
            // console.log(response, 'response for becoming host')
            resolve(response.data.data)
        }).catch(error => {
            reject(error);
        })
    })
}

export const logActivity = (object_id, type = "SEARCH") => {
    return new Promise((resolve, reject) => {
        return api.post(`/client/u_activity`, {
            object_id: object_id,
            type: type
        }).then((result) => {
            // console.log(result);
            resolve(result.data.data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};

