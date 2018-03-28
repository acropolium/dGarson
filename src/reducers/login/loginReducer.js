import {
    userInputPhoneCode,
    userInputPhoneNumber,
    loadInitialState,
    registerRequest,
    loadInitialStateConfirm,
    registerRequestSuccess,
    registerRequestError,
    verifySucess,
    verifyRequest,
    setDeviceToken,
    verifyError
} from '../constAction.js';

const initialState = {
    phone: '',
    phoneFirstPart: '',
    phoneSecondPart: '',
    spinnerShow: false,
    token: false,
    lang: "ua",
    device_token: false,
    device_token_send: 0
}

export default function login(state = initialState, action) {

    switch (action.type) {
        case setDeviceToken:
        case loadInitialState:
        case loadInitialStateConfirm:
        case verifySucess:
            return { ...state, ...action.payload }

        case userInputPhoneCode:
            return { ...state, phoneCode: action.payload.phoneCode }

        case userInputPhoneNumber:
            return { ...state, phoneNumber: action.payload.phoneNumber }
        case verifyRequest:
        case registerRequest:
            return { ...state, spinnerShow: true }
        case registerRequestSuccess:
            return { ...state, ...action.payload, spinnerShow: false }

        case verifyError:
        case registerRequestError:
            return { ...state, spinnerShow: false }

        default:
            return state;
    }

}