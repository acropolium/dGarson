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

function mapStateToProps(state) {

    return {
        current_company_id: state.companies.company_info.id,
        order: state.order,
        company_info: state.companies.company_info,
        currentLocation: state.menu[state.companies.company_info.id].location
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Order);




