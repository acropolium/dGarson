import * as userActions from '../reducers/user/userActions'
import * as orderActions from '../reducers/order/orderActions'
import * as dialogActions from '../reducers/dialog/dialogActions'
import * as spinnerActions from '../reducers/spinner/spinnerActions'
import * as homeConteiner from '../conteiners/homeConteiner'
import * as confirmContainer from '../conteiners/confirmContainer'
import App from '../components/App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {


    return {
        order_state:state.order.order.state,
        user: state.user,
        dialog: state.dialog,
        spinner: state.spinner,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderActions: bindActionCreators(orderActions, dispatch),
        routerActions: bindActionCreators(userActions, dispatch),
        dialogActions: bindActionCreators(dialogActions, dispatch),
        spinnerActions: bindActionCreators(spinnerActions, dispatch),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);




