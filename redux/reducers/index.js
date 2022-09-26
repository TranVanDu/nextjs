import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import UserReducer from './User';
import CountryReducer from './CountryReducer';
import Destination from './Destination';
import Tour from './Tour';
import Search from './Search';
import Flight from './FlightReducer';
import OrderReducer from './Order';
import Coupon from './Coupon';
import Booking from './Booking';
import chatAppReducer from './InboxReducer';
import City from './City';
import ConfigReducer from './ConfigReducer';
import InboxReducer from './Chat';

export const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    country: CountryReducer,
    destination: Destination,
    tour: Tour,
    search: Search,
    flight: Flight,
    order: OrderReducer,
    coupon: Coupon,
    booking: Booking,
    chatAppReducer,
    city: City,
    config: ConfigReducer,
    inbox: InboxReducer
});



