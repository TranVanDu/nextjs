import {
    SEARCH_FLIGHT,
    SET_SELECTED_FLIGHTS
} from '../types';
const INIT_STATE = {
    departureFlights: [],
    returnFlights: [],
    currentQuery: {},
    selectedFlights: []
};
const FlightReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_FLIGHT: {
            var departureFlights = Object.keys(action.payload.DepartureFlights).map(key => {
                return action.payload.DepartureFlights[key];
            });
            var returnFlights = [];
            if (action.payload.ReturnFlights) {
                returnFlights = Object.keys(action.payload.ReturnFlights).map(key => {
                    return action.payload.ReturnFlights[key];
                });
            }
            var currentQuery = { ...action.payload };
            delete currentQuery.DepartureFlights;
            delete currentQuery.ReturnFlights;

            return {
                ...state,
                departureFlights: departureFlights,
                returnFlights: returnFlights,
                currentQuery: currentQuery
            };
        }

        case SET_SELECTED_FLIGHTS: {
            return {
                ...state,
                selectedFlights: action.payload
            }
        }

        default: return state;
    }
}

export default FlightReducer;