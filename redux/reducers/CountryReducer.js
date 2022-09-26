import { GET_ALL_COUNTRY, GET_ALL_DES_AU } from '../types';
const INIT_STATE = {
    listCountry: [],
    paging: {
        count: 0,
        totalPage: 1,
        perpage: 1,
        page: 1
    },
    desAu: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRY: {
            return {
                ...state,
                listCountry: action.payload.list,
                paging: action.payload.paging
            };
        }
        case GET_ALL_DES_AU: {
            return {
                ...state,
                desAu: action.payload
            }
        }

        default: return state;
    }
}