import { SET_NEW_MESSAGE_INBOX } from '../types';

const INIT_STATE = {
    newMessage: null
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_NEW_MESSAGE_INBOX:
            return {
                newMessage: action.payload
            }

        default:
            return state;
    }
}   