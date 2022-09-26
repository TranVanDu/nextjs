import { SET_NEW_MESSAGE_INBOX } from '../types';
export const setNewMessage = (data) => dispatch => {
    dispatch({ type: SET_NEW_MESSAGE_INBOX, payload: data });
}