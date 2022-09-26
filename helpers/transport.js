import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

export const getRoutePrice = (route, type, time) => {
    let price = 0;
    if (type == 1) price = route.price_onward;
    else price = route.price_return;
    var promotion = 0;
    var time1 = moment(time, "DD/MM/YYYY HH:mm");
    var time2 = time1.add(1, 'day');
    var timeStr = moment(time, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");
    var timeStr2 = time2.format("DD/MM/YYYY")
    var timeInt1 = moment(time, "DD/MM/YYYY HH:mm").valueOf();
    var timeInt2 = moment(`${timeStr} ${route.start_night}`, "DD/MM/YYYY HH:mm").valueOf();
    var timeInt3 = moment(`${timeStr2} ${route.end_night}`, "DD/MM/YYYY HH:mm").valueOf();
    var timeInt4 = moment(`${timeStr} ${route.end_night}`, "DD/MM/YYYY HH:mm").valueOf();
    var timeStr3 = moment(time, "DD/MM/YYYY HH:mm").subtract(1, "day").format("DD/MM/YYYY");
    var timeInt5 = moment(`${timeStr3} ${route.start_night}`, "DD/MM/YYYY HH:mm").valueOf();

    if (route.promotion_status == 1) {
        if (moment(route.promotion_start_buy).valueOf() <= moment().valueOf() && moment().valueOf() <= moment(route.promotion_end_buy).valueOf()) {
            if (moment(route.promotion_start_date).valueOf() <= timeInt1 && timeInt1 <= moment(route.promotion_end_date).valueOf()) {
                promotion = price * route.promotion_amount / 100;
                promotion = Math.round(promotion);
            }
        }
    }

    if (((timeInt1 >= timeInt2) && (timeInt1 <= timeInt3)) || ((timeInt1 <= timeInt4) && (timeInt1 >= timeInt5))) {
        if (route.price_add_night)
            price = price + route.price_add_night
    }
    return { price, promotion };
}

export const vehicleType = (type, car_type = []) => {

    for (let i = 0; i < car_type.length; i++) {
        if (type == car_type[i].ma) return car_type[i].title;
    }
    return '';

}