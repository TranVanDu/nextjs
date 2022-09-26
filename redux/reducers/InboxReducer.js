/**
 * Chat App Reducers
 */

// actions types
import {
    CHAT_WITH_SELECTED_USER,
    SEND_MESSAGE_TO_USER,
    UPDATE_USERS_SEARCH,
    SEARCH_USERS,
    GET_RECENT_CHAT_USERS,
    REPLY_CONVERSATION_CHAT,
    GET_ALL_MESSAGES_CHAT,
    GET_ALL_CONVERSATION_CHAT,
    GET_USER_CONVERSATION_CHAT,
    SET_READ_CONVERSATION_CHAT,
    GET_NEW_MESSAGE_CONVERSATION_CHAT,
    GET_CVS_DETAIL
} from '../types';

const INITIAL_STATE = {
    selectedUser: null,
    newMessage: null,
    userConversationChat: {
        list: [],
        paging: {
            count: 0,
            totalpage: 1,
            perpage: 20,
            page: 1
        },
        count_unread: 0
    },
    allMessagesChat: {
        list: [],
        paging: {
            count: 0,
            totalpage: 1,
            perpage: 20,
            page: 1
        },
        attend: false
    },
    currSetReply: null,
    currentConversation: null
};

function findItem(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) return i;
    }
    return -1;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHAT_WITH_SELECTED_USER:
            return { ...state, selectedUser: action.payload }

        case GET_CVS_DETAIL: {
            return { ...state, currentConversation: action.payload }
        }

        // send message to user

        case GET_USER_CONVERSATION_CHAT: {
            return { ...state, userConversationChat: action.payload   }
        }

        case GET_ALL_MESSAGES_CHAT: {
            return { ...state, allMessagesChat: action.payload }
        }

        case REPLY_CONVERSATION_CHAT: {
            return { ...state, currSetReply: action.payload, allMessagesChat: { ...state.allMessagesChat, attend: true } }
        }

        case SET_READ_CONVERSATION_CHAT: {
            return {
                ...state,
                userConversationChat:{...state.userConversationChat, count_unread:state.userConversationChat.count_unread -1 },
                selectedUser: { ...state.selectedUser, unread: false },
            }
        }

        case GET_NEW_MESSAGE_CONVERSATION_CHAT: {
            let newM = action.payload;
            let newListM = [...state.allMessagesChat.list];
            newListM.push(newM);
            return {
                ...state,
                allMessagesChat: {
                    ...state.allMessagesChat,
                    list: newListM
                },
                newMessage: newM
            }

        }

        default: return { ...state };
    }
}
