import * as dialogActions from '../reducers/dialog/dialogActions'
import * as companiesActions from '../reducers/companies/companiesActions'
import * as menuActions from '../reducers/menu/menuActions'
import Companies from '../components/Companies'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(dialogActions, dispatch),
        companiesActions: bindActionCreators(companiesActions, dispatch),
        getCompanyMenu: bindActionCreators(menuActions.companysMenu, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        needUpdateFromServer: state.companies.needUpdateFromServer,
        needUpdate: state.companies.needUpdate,
        companies: state.companies.companies,
        spinnerShow: state.companies.spinnerShow
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)
