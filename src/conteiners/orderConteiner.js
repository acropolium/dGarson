import * as orderActions from '../reducers/order/orderActions'
import Order from '../components/Order'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function mapDispatchToProps(dispatch) {

    return {
        orderActions: bindActionCreators(orderActions, dispatch),
    }
};

function mapStateToProps(state) {

    return {
        order: state.order
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Order);




