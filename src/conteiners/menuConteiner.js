import * as dialogActions from '../reducers/dialog/dialogActions'
import * as orderActions from '../reducers/order/orderActions'
import * as menuActions from '../reducers/menu/menuActions'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function mapDispatchToProps(dispatch) {

    return {

       
        menuActions: bindActionCreators(menuActions, dispatch),
        addOrderItem: bindActionCreators(orderActions.addItem, dispatch),

    }
};

function mapStateToProps(state) {
    //alert(JSON.stringify(state.order.draft))
    return {
        menu: state.menu,
        company_info: state.companies.company_info,
        order: Object.assign({},state.order.draft)
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);




