import {

    menuRequest,
    menuSucess,
    menuError,
    setLocation
} from './constatntReducer.js';
import store from "../../utils/storage";
//
const initialState = {
    spinnerShow: false,
    menu: {},
    location: false
};

export default function menu(state = initialState, action) {


    switch (action.type) {
        case setLocation:
            let withLoc = { ...state, ...{ [action.payload.current_company_id]: { ...state[action.payload.current_company_id], ...{ "location": action.payload.location_id } } } }
            store.save('menu', withLoc);
            return withLoc;
        case menuSucess:
            return { ...state, ...action.payload, spinnerShow: false }
        case menuRequest:
            return { ...state, spinnerShow: true }
        case menuError:
            return { ...state, spinnerShow: false }
        default:
            return state;
    }
}