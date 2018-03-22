import {

    companyRequest,
    companySucess,
    companyError
} from './constatntReducer.js';

import store from "../../utils/storage";
const initialState = {
    spinnerShow: false,
    companies: {},
    company_info: {},
};

export default function company(state = initialState, action) {
    switch (action.type) {

        case "companyOrderState":

            let companies =
                {
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


            store.save('companies', companies)
            return { ...state, ...{ "companies": companies } };
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