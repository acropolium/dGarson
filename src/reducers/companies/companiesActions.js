import api from '../../services/apiService';
import moment from "moment/moment";
import store from "../../utils/storage";
import * as routeService from "../../services/routeService";
import {

    companyRequest,
    companySucess,
    companyError
} from './constatntReducer.js';

const initialCompaniesStateKeys = [
    'token',
    'lang',
];


export function loadInitialStateAct(type, payload) {

    return (dispatch, props) => {
        dispatch({
            type: type,
            payload: payload
        })
    }

}


export function getItemsFromStorage() {

    return (dispatch, props) => {


        dispatch({
            type: companyRequest,

        })

        let requestCompanies = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });

        requestCompanies.companies('GET', false).then((response) => {

            let companies = {};
            alert(JSON.stringify(response))
            // routeService.changePage('home');
            if (response.data) {
                response.data.forEach((item) => {
                    companies[item.id] = item;
                });

                dispatch({
                    type: companySucess,
                })
                

                // await userService.set({ companies: companies });
                // await userService.saveLastUpdateCompanies();

               /* if (response.data.length == 1) {
                    let data = { company_info: response.data[0], company: response.data[0].id };

                    if (response.data[0].hasOwnProperty('locations') && response.data[0].locations[0]) {
                        data['location'] = response.data[0].locations[0].id;
                    } else {
                        data['location'] = false;
                    }

                    //  await userService.set(data);

                    //this.props.spinnerActions.hide();
                    //await userService.changePage('menu');
                }*/
                /*else {
                    if (manualUpdate == false)
                        this.props.spinnerActions.hide();
                }*/

                // this.clearSearch();
            } else {
                routeService.changePage('home');

            }
        }).catch(
            (error) => {
                dispatch({
                    type: companyError,
                })

                Promise.reject(error);

            });
    }
}
