import * as dialogActions from '../reducers/dialog/dialogActions'
import App from '../components/App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../reducers/app/appActions'

const mapStateToProps = (state) => {
    return {
        order_state: state.order.order.state,
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        appAction: bindActionCreators(appActions, dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);




