import * as routeService from "../services/routeService";
import Location from '../components/Location'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import company from '../reducers/companies/companiesReducer';
import store from "../utils/storage";

function mapStateToProps(state) {

    return {


        company_info: state.companies.company_info,
        current_location: state.menu[state.companies.company_info.id].location,
        changePage: routeService.changePage
    };


}


function mapDispatchToProps(dispatch) {

    return {

        setCurrentLocation: (loacationID) => {

            store.save("location", loacationID);

            dispatch({
                //write reducer
                type: 'menuSucess',
                payload: { location: loacationID }
            })
        }


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);




