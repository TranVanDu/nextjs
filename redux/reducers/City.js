import {
    GET_CITY_DETAIL,
    GET_POPULAR_PAKAGES,
    GET_POPULAR_ATTRACTION,
    GET_POPULAR_CITY_ESCAPE,
    GET_ELEMENT_CITY,
    GET_POPULAR_ACTIVITI,
    SEARCH_CITY_ACTIVITI,
    GET_DETAIL_TICKET,
    LIKE_TICKET,
    UNLIKE_TICKET
} from '../types';


const INIT_STATE = {
    cityDetail: {},
    popularAttraction: [],
    popularPakages: [],
    popularCityEscape: [],
    elementCity: [],
    dest_name: "",
    popularActiviti: [],
    dataSearchActivities: [],
    keyword: "",
    ticketDetail: {}
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CITY_DETAIL: {
            return {
                ...state,
                cityDetail: action.payload
            };
        }
        case GET_POPULAR_PAKAGES: {
            return {
                ...state,
                popularPakages: action.payload
            }
        }
        case GET_POPULAR_ATTRACTION: {
            return {
                ...state,
                popularAttraction: action.payload
            }
        }
        case GET_POPULAR_CITY_ESCAPE: {
            return {
                ...state,
                popularCityEscape: action.payload
            }
        }

        case GET_ELEMENT_CITY: {
            return {
                ...state,
                elementCity: action.payload,
                dest_name: action.dest_name
            }
        }

        case GET_POPULAR_ACTIVITI: {
            return {
                ...state,
                popularActiviti: action.payload,
            }
        }

        case SEARCH_CITY_ACTIVITI: {
            return {
                ...state,
                dataSearchActivities: action.payload,
                keyword: action.k
            }
        }

        case GET_DETAIL_TICKET: {
            return {
                ...state,
                ticketDetail: action.payload
            }
        }

        case LIKE_TICKET: {
            return {
                ...state,
                ticketDetail: {
                    ...state.ticketDetail,
                    liked: true
                }
            }
        }
        case UNLIKE_TICKET: {
            return {
                ...state,
                ticketDetail: {
                    ...state.ticketDetail,
                    liked: false
                }
            }
        }

        default: return state;
    }
}