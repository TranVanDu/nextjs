import {
    GET_USER_BY_TOKEN,
    CHANGE_PASSWORD,
    LOGOUT,
    UPDATE_USER_INFORMATION,
    UPDATE_AVATAR,
    LOGIN
} from '../types';

const INIT_STATE = {
    user: null
}

const authState = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER_BY_TOKEN: {
            let user = action.payload;
            if (user) {
                if (!user.firstname && !user.lastname) {
                    if (user.email) user.firstname = user.email;
                    if (user.mobile && !user.firstname) user.firstname = user.mobile;
                }
            }
            
            return {
                user: user
            }
        }
        case LOGIN: {
            let user = action.payload;
            if (user) {
                if (!user.firstname && !user.lastname) {
                    if (user.email) user.firstname = user.email;
                    if (user.mobile && !user.firstname) user.firstname = user.mobile;
                }
            }
            return {
                user: user
            }
        }
        case CHANGE_PASSWORD: {
            return {
                user: null
            }
        }
        case LOGOUT: {
            return {
                user: null
            }
        }
        case UPDATE_USER_INFORMATION: {
            return {
                user: action.payload
            }
        }
        case UPDATE_AVATAR: {
            return {
                ...state,
                user: action.payload
            }
        }
        default: return state;
    }
}

export default authState;