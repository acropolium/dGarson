import {

    companyRequest,
    companySucess,
    companyError
} from './constatntReducer.js';


const initialState = {
    spinnerShow: false,
    companies: {},
    company_info: {},
};

export default function company(state = initialState, action) {
    switch (action.type) {

        case "companyOrderState":

            return {
                ...state, ...{
                    "companies": {
                        ...state.companies,
                        ...{
                            [action.payload.company_id]: {
                                ...state.companies[action.payload.company_id],
                                ...{
                                    latest_order: {
                                        ...state.companies[action.payload.company_id].latest_order,
                                        state: action.payload.data
                                    }
                                }
                            }
                        }

                    }
                }
            }
        case companySucess:
            return { ...state, ...action.payload, spinnerShow: false }
        case companyRequest:
            return { ...state, spinnerShow: true }
        case companyError:
            return { ...state, spinnerShow: false }
        default:
            return state;
    }
}