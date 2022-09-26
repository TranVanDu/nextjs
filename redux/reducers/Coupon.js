import { GET_LIST_COUPON } from '../types';

const INIT_STATE = {
    listCoupon: []

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_COUPON: {
            return {
                listCoupon: action.payload
            };
        }

        default: return state;
    }
}