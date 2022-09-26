import { GET_AUTOCOMPLETE } from '../types';

const INIT_STATE = {
    dataAutocomplete: {
        tour: [],
        landscape: [],
        city: []
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_AUTOCOMPLETE: {
            return { ...state, dataAutocomplete: action.payload }
        }

        default: return state;
    }
}