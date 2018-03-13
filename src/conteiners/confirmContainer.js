import * as dialogActions from '../reducers/dialog/dialogActions'
import * as loginActions from '../reducers/login/loginActions'
import Confirm from '../components/Confirm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function mapDispatchToProps(dispatch) {

    return {

        dialogActions: bindActionCreators(dialogActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    }
};

function mapStateToProps(state) {

    return {
        login: state.login
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);




