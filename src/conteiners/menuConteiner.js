import * as dialogActions from '../reducers/dialog/dialogActions'
//import * as companiesActions from '../reducers/companies/companiesActions'
import * as menuActions from '../reducers/menu/menuActions'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function mapDispatchToProps(dispatch) {

    return {

        dialogActions: bindActionCreators(dialogActions, dispatch),
        menuActions: bindActionCreators(menuActions, dispatch),

    }
};

function mapStateToProps(state) {
    
    return {
        menu: state.menu,
        company_info: state.companies.company_info
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);




