import qs from 'qs';
import {
    SEARCH_FLIGHT,
    SET_SELECTED_FLIGHTS,
    BOOK_FLIGHT
} from '../types';
import { searchFlight, bookFlight } from '../../requests/flight';

export const searchFlightAction = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        searchFlight(data).then(response => {
            console.log(response)
            dispatch({ type: SEARCH_FLIGHT, payload: response.Data });
            localStorage.setItem('flightDataSession', response.Data.DataSession);
            resolve(response.Data);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export const selectFlightsToBookingAction = (query, flights) => dispatch => {
    localStorage.setItem('flightQuery', JSON.stringify(query));
    localStorage.setItem('selectedFlights', JSON.stringify(flights));
    dispatch({ type: SET_SELECTED_FLIGHTS, payload: flights });
}

export const bookFlightAction = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        bookFlight(data).then(response => {
            console.log(response)
            dispatch({ type: BOOK_FLIGHT, payload: response.data });
            resolve(response.data);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}
