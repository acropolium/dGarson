import {
    MENU_REQUEST,
    MENU_SUCCES,
    MENU_ERROR,
    SET_LOCATION,
} from '../constAction.js';
import store from '../../utils/storage';

const initialState = {
    spinnerShow: false,
    menu: {},
    location: false,
};

export default function menu(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION:
            let withLoc = {
                ...state,
                ...{
                    [action.payload.current_company_id]: {
                        ...state[action.payload.current_company_id],
                        ...{ location: action.payload.location_id },
                    },
                },
            };
            store.save('menu', withLoc);
            return withLoc;
        case MENU_SUCCES:
            return { ...state, ...action.payload, spinnerShow: false };
        case MENU_REQUEST:
            return { ...state, spinnerShow: true };
        case MENU_ERROR:
            return { ...state, spinnerShow: false };
        default:
            return state;
    }
}
