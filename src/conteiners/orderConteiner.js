import * as orderActions from '../reducers/order/orderActions'
import Order from '../components/Order'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as routeService from "../services/routeService";
import * as dialogActions from '../reducers/dialog/dialogActions'

function mapDispatchToProps(dispatch) {

    return {
        orderActions: bindActionCreators(orderActions, dispatch),
        changePage: routeService.changePage,
        dialogActions: bindActionCreators(dialogActions, dispatch),
    }
};

function getCurrentMenu(state) {

    let id_company = state.companies.company_info ? state.companies.company_info.id ? state.companies.company_info.id : 0 : 0
    return state.menu[id_company] ? state.menu[id_company] : {}
}

function mapStateToProps(state) {

    return {

        order_item: state.order.order.items,
        order_state: state.order.order.state,
        order_id: state.order.order.id,
        current_company_id: state.companies.company_info.id,
        company_info: state.companies.company_info,
        currentLocation: getCurrentMenu(state).location,
        order_cost: state.order.order.cost,
        order: state.order,

    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Order);




