import {
    GET_FILTER,
    GET_TOUR_BY_DESTID,
    GET_TOUR_DETAIL,
    LIKE_TOUR,
    UNLIKE_TOUR,
    SET_DEST_NAME

} from '../types';

const INIT_STATE = {
    filter: {},
    listTour: [],
    dest_name: "",
    paging: {
        count: 3,
        totalpage: 1,
        perpage: "10",
        page: "1"
    },
    tourDetail: {
        thumb_garelly: [],
        reviews: {
            list: [],
            avg: 0,
        },
        airlines: [],
        departures: [],
        itinerary: [],
        meals: {}
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FILTER: {
            return { ...state, filter: action.payload }
        }
        case GET_TOUR_BY_DESTID: {
            return { ...state, listTour: action.payload, dest_name: action.dest_name ? action.dest_name : "", paging: action.paging }
        }
        case GET_TOUR_DETAIL: {
            return {
                ...state,
                tourDetail: action.payload,
                dest_name: ""
            }
        }
        case LIKE_TOUR: {
            return {
                ...state,
                tourDetail: {
                    ...state.tourDetail,
                    liked: action.payload
                }
            }
        }
        case UNLIKE_TOUR: {
            return {
                ...state,
                tourDetail: {
                    ...state.tourDetail,
                    liked: action.payload
                }
            }
        }

        case SET_DEST_NAME: {
            return {
                ...state,
                dest_name: action.dest_name
            }
        }
        default: return state;
    }
}