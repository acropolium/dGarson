import {
    USER_INPUT_PHONE_CODE,
    USER_INPUT_PHONE_NUMBER,
    LOAD_INITIAL_STATE,
    REGISTER_REQUEST,
    LOAD_INITIAL_STATE_CONFIRM,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_ERROR,
    VERIFY_SUCCES,
    VERIFY_REQUEST,
    SET_DEVICE_TOKEN,
    VERIFY_ERROR,
} from '../constAction.js';

const initialState = {
    phone: '',
    phoneFirstPart: '',
    phoneSecondPart: '',
    spinnerShow: false,
    token: false,
    lang: 'ua',
    device_token: false,
    device_token_send: 0,
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case SET_DEVICE_TOKEN:
        case LOAD_INITIAL_STATE:
        case LOAD_INITIAL_STATE_CONFIRM:
            return { ...state, ...action.payload };

        case USER_INPUT_PHONE_CODE:
            return { ...state, phoneCode: action.payload.phoneCode };

        case USER_INPUT_PHONE_NUMBER:
            return { ...state, phoneNumber: action.payload.phoneNumber };
        case VERIFY_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, spinnerShow: true };
        case REGISTER_REQUEST_SUCCESS:
        case VERIFY_SUCCES:
            return { ...state, ...action.payload, spinnerShow: false };

        case VERIFY_ERROR:
        case REGISTER_REQUEST_ERROR:
            return { ...state, spinnerShow: false };

        default:
            return state;
    }
}
