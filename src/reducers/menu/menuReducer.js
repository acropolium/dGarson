import {

    menuRequest,
    menuSucess,
    menuError
} from './constatntReducer.js';


const initialState = {
    spinnerShow: false,
    menu: {},
    company_info: {}
};

export default function menu(state = initialState, action) {
    switch (action.type) {

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