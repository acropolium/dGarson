import {combineReducers} from 'redux'

import user from './user/userReducer'
import order from './order/orderReducer'
import dialog from './dialog/dialogReducer'
import spinner from './spinner/spinnerReducer'
import companies from './companies/companiesReducer';

export default combineReducers({
    user,
    order,
    dialog,
    spinner,
    companies
})