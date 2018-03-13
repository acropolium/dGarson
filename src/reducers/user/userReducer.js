import { USER } from "../const";

const initialState = {
    token: false,
    device_token: false,
    device_token_sent: false,
    state: 'init',
    phone: '',
    company: 1,
    companies: {},
    menus: {},
    location: false,
    company_info: {},
    verify_code: '',
    loaded: false,
    menu: [],
    lang: 'ua'
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER.FETCHING_PHONE_ENTER:
            return {
                ...state,
                isPhoneEnterFetching: true,
            };
        case USER.SUCCESS_PHONE_ENTER:
            return {
                ...state,
                isPhoneEnterFetching: false
            };
        case USER.FAILURE_PHONE_ENTER:
            return {
                ...state,
                isPhoneEnterFetching: false,
            };

        case 'change_page':
            return Object.assign({}, state, action.payload);
        case 'set_data':
            return Object.assign({}, state, action.payload);
        case 'load_data':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
