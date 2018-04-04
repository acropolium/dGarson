import * as dialogActions from '../reducers/dialog/dialogActions';
import * as companiesActions from '../reducers/companies/companiesActions';
import * as menuActions from '../reducers/menu/menuActions';
import AboutUs from '../components/AboutUs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        company_info: state.companies.company_info,
        current_location: state.menu[state.companies.company_info.id].location,
    };
}

export default connect(mapStateToProps)(AboutUs);
