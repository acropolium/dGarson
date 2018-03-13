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
   // companySucess,
    verifyError
} from './constatntReducer.js';

const initialState = {
    phone: '',
    phoneFirstPart: '',
    phoneSecondPart: '',
    spinnerShow: false,
    token: false,
}

export default function login(state = initialState, action) {

    switch (action.type) {

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

       // case companySucess:
        case registerRequestSuccess:
            return { ...state, ...action.payload, spinnerShow: false }

        case verifyError:
        case registerRequestError:
            return { ...state, spinnerShow: false }

        default:
            return state;
    }

}