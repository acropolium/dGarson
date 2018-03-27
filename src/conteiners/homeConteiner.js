import * as dialogActions from '../reducers/dialog/dialogActions'
import * as loginActions from '../reducers/login/loginActions'
import { bindActionCreators } from 'redux'
import Home from '../components/Home'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {

    return {

        dialogActions: bindActionCreators(dialogActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    }
};

function mapStateToProps(state) {


    return {

        phoneCode: state.login.phoneCode,
        phoneNumber: state.login.phoneNumber,
        spinnerShow: state.login.spinnerShow,
        lang: state.login.lang
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);




