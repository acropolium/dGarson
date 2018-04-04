import * as dialogActions from '../reducers/dialog/dialogActions';
import Popage from '../components/Popage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        dialog: state.dialog,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popage);
