import * as routeService from "../services/routeService";
import * as orderActions from '../reducers/order/orderActions'
import * as menuActions from '../reducers/menu/menuActions'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function mapDispatchToProps(dispatch) {

    return {


        menuActions: bindActionCreators(menuActions, dispatch),
        addOrderItem: bindActionCreators(orderActions.addItem, dispatch),
        removeOrderItem: bindActionCreators(orderActions.removeItem, dispatch),
        changeOrderItemAddition: bindActionCreators(orderActions.changeItemAddition, dispatch),
        setOrder: bindActionCreators(orderActions.setOrder, dispatch),
        changePage: routeService.changePage

    }
};

function mapStateToProps(state) {
    let id_company = state.companies.company_info ? state.companies.company_info.id ? state.companies.company_info.id : 0 : 0

    alert(state.menu[id_company])
    return {
        menu: state.menu[id_company],
        company_info: state.companies.company_info,
        order_draft: Object.assign({}, state.order.draft),
        total_price: state.order.price
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);




