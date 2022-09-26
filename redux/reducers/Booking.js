import { BOOKING, BOOKING_TICKET } from '../types';

const INIT_STATE = {

    order: {},
    order_ticket: {}

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case BOOKING: {
            return {
                ...state,
                order: action.payload
            };
        }

        case BOOKING_TICKET: {
            return {
                ...state,
                order_ticket: action.payload
            }
        }

        default: return state;
    }
}