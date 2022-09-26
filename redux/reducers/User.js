import { GET_MY_WISH_LIST, GET_MY_BOOKING, REMOVE_MY_WISH_LIST, GET_MY_REVIEW, CREATE_REVIEW_MY_BOOKING, GET_LiST_COUPON ,REDEEM_COUPON} from '../types';

const INIT_STATE = {
    myWishList: {
        WishList: [],
        paging: {
            count: 0,
            totalPage: 1,
            perpage: 1,
            page: 1
        },
    },
    myBooking: {
        booking: [],
        paging: {
            count: 0,
            totalPage: 1,
            perpage: 1,
            page: 1
        },

    },
    myReView: {
        ListMyReview: []
    },
    coupon: {
        ListCoupon: []
    }

}
function findIndex(arrID, id) {
    if (arrID.length) {
        for (let i = 0; i < arrID.length; i++) {
            if (arrID[i].id.toString() === id.toString()) return true;
        }
    }
    return false;
}
const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MY_WISH_LIST: {
            return {
                ...state,
                myWishList: {
                    WishList: action.payload.list,
                    paging: action.payload.paging
                }
            }
        }
        case GET_MY_BOOKING: {
            return {
                ...state,
                myBooking: {
                    booking: action.payload.list,
                    paging: action.payload.paging
                }
            }
        }
        case REMOVE_MY_WISH_LIST: {
            let newList = state.myWishList.WishList.filter(item => {
                return item.id.toString() !== action.payload.toString();
            });
            return {
                ...state,
                myWishList: {
                    WishList: newList,
                }
            };
        }
        case GET_MY_REVIEW: {
            return {
                ...state,
                myReView: {
                    ListMyReview: action.payload
                }
            }
        }
        case GET_LiST_COUPON:{
            return {
                ...state,
                coupon:{
                    ListCoupon: action.payload
                }
            }
        }
        case REDEEM_COUPON:{
            var newList= [...state.coupon.ListCoupon]
            newList.unshift(action.payload)
            return{
                ...state,
                coupon:{
                    ListCoupon: newList
                }
            }
        }
      
        default: return state;
    }
}

export default userReducer;