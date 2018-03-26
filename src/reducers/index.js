import { combineReducers } from 'redux'
import order from './order/orderReducer'
import dialog from './dialog/dialogReducer'
import companies from './companies/companiesReducer';
import menu from './menu/menuReducer';
import login from './login/loginReducer';



export default combineReducers({
    order,
    dialog,
    companies,
     menu,
    login
})