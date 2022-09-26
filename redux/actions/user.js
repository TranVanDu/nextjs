import api from '../../utils/api';
import apiformData from '../../utils/api';
import {
  GET_MY_WISH_LIST,
  UPDATE_USER_INFORMATION,
  GET_MY_BOOKING,
  REMOVE_MY_WISH_LIST,
  GET_LiST_COUPON,
  REDEEM_COUPON,
  LIKE_TOUR,
  UNLIKE_TOUR,
  GET_ORDER_DETAIL,
  UPDATE_ORDER_DETAIL,
  UNLIKE_TICKET,
  LIKE_TICKET
} from '../types';
import qs from "qs";
import { requestUpdateUserInformation } from '../../requests/user';

export const reDeemCoupon = (data) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post('/loyalty/redeemCoupon', data)
      .then(res => {
        resolve(res.data);
        dispatch({ type: REDEEM_COUPON, payload: res.data.data });
      })
      .catch(error => {


        NotiError(error.response.data.message)

        reject(error.response);

      });
  });
};
export const getListCoupon = (id) => dispatch => {

  return new Promise((resolve, reject) => {
    api
      .get(`/loyalty/listCoupon/${id}`)
      .then(res => {
        resolve(res.data);
        dispatch({ type: GET_LiST_COUPON, payload: res.data.data });
      })
      .catch(error => {
        reject(error.response);

      });
  });
};
export const getListCouponUsed = (id) => {

  return new Promise((resolve, reject) => {
    api
      .get(`/loyalty/listCouponUsed/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error.response);

      });
  });
};

export const updateAvatar = (data) => dispatch => {

  return new Promise((resolve, reject) => {
    apiformData
      .post('/client/account/updateAvatar', data)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error.response);
      })
  })
}

export const getAllWishList = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get(`/tour/mywishlist?user_id=${id}`)
      .then(res => {
        resolve(res.data);
        dispatch({ type: GET_MY_WISH_LIST, payload: res.data.data });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getMyBooking = (filter = {}, id) => dispatch => {
  console.log('data', id);

  return new Promise((resolve, reject) => {
    api
      .get(`/booking/list/${id}`, {
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(res => {
        resolve(res.data);
        dispatch({ type: GET_MY_BOOKING, payload: res.data.data });
      })
      .catch(error => {
        reject(error.response);
        console.log(error.response);

      });
  });
}
export const removeMyWishList = ids => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post("/tour/removewishlist", ids)
      .then(res => {
        dispatch({ type: REMOVE_MY_WISH_LIST, payload: ids.tour_id });
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const removeWishList = ids => dispatch => {
  console.log(ids)
  return new Promise((resolve, reject) => {
    api
      .post("/tour/removewishlist", ids)
      .then(res => {
        resolve(res.data);
        dispatch({ type: UNLIKE_TOUR, payload: false });
        dispatch({ type: UNLIKE_TICKET, payload: false })
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateUserInformation = data => dispatch => {

  return new Promise((resolve, reject) => {
    requestUpdateUserInformation(data)
      .then(res => {
        dispatch({ type: UPDATE_USER_INFORMATION, payload: res });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getMyReview = (filter = {}, type) => dispatch => {
  return new Promise((resolve, reject) => {
    api.get(`/review/myreview/${type}`
      , {
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      }
    ).then(
      res => {
        // dispatch({ type: GET_MY_REVIEW, payload: res.data.data });
        resolve(res.data.data);
      }
    )
      .catch(error => {
        reject(error);
      })
  })
}
export const getdetailOrder = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get(`/booking/detail/${id}`)
      .then(res => {
        dispatch({ type: GET_ORDER_DETAIL, payload: res.data.data });
        resolve(res.data.data);



      })
      .catch(error => {
        reject(error);

      });
  });
}
export const detailOrder = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/booking/detail/${id}`)
      .then(res => {

        resolve(res.data.data);



      })
      .catch(error => {
        reject(error);

      });
  });
}
export const updatePassenger = (data) => dispatch => {
  console.log('datasub', data);

  return new Promise((resolve, reject) => {
    api
      .post("/booking/passenger/update", data)
      .then(res => {
        dispatch({ type: UPDATE_ORDER_DETAIL, payload: res.data.data, id: data.id });
        resolve(res.data.data);


      })
      .catch(error => {
        reject(error);
        console.log(error.response)
      });
  });
}
export const createReviewMyBooking = data => {

  return new Promise((resolve, reject) => {
    api.post('/review/createReview', data).then(res => {
      resolve(res.data.data);

    }
    ).catch(error => {
      reject(error);


    })
  })
}
export const inviteFriendSignUp = () => {
  return new Promise((resolve, reject) => {
    api
      .get('loyalty/loadRule/INVITE_FRIEND_SIGNUP')
      .then(res => {
        resolve(res.data);

      })
      .catch(error => {
        reject(error);

      });
  });
}
export const addWishList = ids => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post("/tour/addwishlist", ids)
      .then(res => {
        resolve(res.data);
        console.log("like", res.data)
        dispatch({ type: LIKE_TOUR, payload: true });
        dispatch({ type: LIKE_TICKET, payload: true })
      })
      .catch(error => {
        reject(error);
      });
  });
};