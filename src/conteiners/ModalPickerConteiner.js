import * as routeService from "../services/routeService";
import * as orderActions from '../reducers/order/orderActions'
import * as menuActions from '../reducers/menu/menuActions'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ModalPicker from '../widgets/modal-picker';

function mapDispatchToProps(dispatch) {

    return {

        setOrder: bindActionCreators(orderActions.setOrder, dispatch),
    }
};

function mapStateToProps(state) {
    
    return {
        desired_time: state.order.desired_time
    };


}


export default connect(mapStateToProps, mapDispatchToProps)(ModalPicker);




