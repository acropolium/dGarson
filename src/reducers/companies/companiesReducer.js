import {
    COMPANY_OPDER_STATE,
    COMPANY_REQUEST,
    COMPANY_SUCCES,
    COMPANY_ERROR
} from '../constAction.js'

import store from '../../utils/storage'
const initialState = {
    spinnerShow: false,
    companies: {},
    company_info: {}
}

export default function company(state = initialState, action) {
    switch (action.type) {
        case COMPANY_OPDER_STATE:
            let companies = {
                ...state.companies,
                ...{
                    [action.payload.company_id]: {
                        ...state.companies[action.payload.company_id],
                        ...{
                            latest_order: {
                                ...state.companies[action.payload.company_id]
                                    .latest_order,
                                state: action.payload.data
                            }
                        }
                    }
                }
            }

            store.save('companies', companies)
            return { ...state, ...{ companies: companies } }
        case COMPANY_SUCCES:
            return { ...state, ...action.payload, spinnerShow: false }
        case COMPANY_REQUEST:
            return {
                ...state,
                spinnerShow: true,
                needUpdate: false,
                needUpdateFromServer: false
            }
        case COMPANY_ERROR:
            return { ...state, spinnerShow: false }
        default:
            return state
    }
}
//
