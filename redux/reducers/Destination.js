import {ALL_DESTINATION, GET_ABOUT_DESTINATION} from '../types';
const INIT_STATE = {
    listdestination: [],
    paging: {
        count: 0,
        totalPage: 1,
        perpage: 1,
        page: 1
    },
    aboutDestination: {}
  };
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ALL_DESTINATION: {
            return {
                ...state,
                listdestination: action.payload.list,
                paging: action.payload.paging
            };
        }
        case GET_ABOUT_DESTINATION: {
            return{
                ...state,
                aboutDestination: action.payload
            }
        }
        
  
        default: return state;
    }
  }