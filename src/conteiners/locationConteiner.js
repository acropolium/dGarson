import * as routeService from "../services/routeService";
import Location from '../components/Location'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import company from '../reducers/companies/companiesReducer';


function mapStateToProps(state) {

    return {

        current_company_id: state.companies.company_info.id,
        company_info: state.companies.company_info,
        current_location: state.menu[state.companies.company_info.id].location,
        changePage: routeService.changePage
    };


}


function mapDispatchToProps(dispatch) {

    return {

        setCurrentLocation: (loacation_id, current_company_id) => {

          dispatch({
                //write reducer11111111111111111111
                type: 'setLocation',
                payload: { location_id: loacation_id, current_company_id: current_company_id }
            })
        }


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);




