import { GET_ORDER_DETAIL, UPDATE_ORDER_DETAIL } from '../types';

const INIT_STATE = {
    orderdetail: {
        passenger: []
    }

}
function findIndex(arrID, id) {
    if (arrID.length) {
        for (let i = 0; i < arrID.length; i++) {

            
            if (arrID[i].id.toString() === id.toString()) return i;
        }
    }
    return -1;
}
const OrderReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_DETAIL: {
            return {
                ...state,
                orderdetail: action.payload


            }
        }
        case UPDATE_ORDER_DETAIL: {
            let { id } = action;
            
            let index = findIndex(state.orderdetail.passenger, id);
            if(index >= 0){
            var list = [...state.orderdetail.passenger];
            list[index] = action.payload;
            return {
                orderdetail: {
                    ...state.orderdetail,
                    passenger: list
                }
            };
        }
        }

        default: return state;
    }
}

export default OrderReducer;