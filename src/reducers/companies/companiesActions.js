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

function saveStore(data) {

    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}

let timeUpdate = 1;//60000;

export function getItemsFromStorage(readFromServer = false) {

    return (dispatch, props) => {

        dispatch({ type: companyRequest })

        let lastTime = store.get('companyUpdate');
        let currentTime = new Date().getTime();
        let needUpdate = currentTime - lastTime > timeUpdate;

        if (!Number.isInteger(lastTime) || needUpdate || readFromServer) {

            return serverReqestCompanys(dispatch);
        } else {

            dispatch({
                type: companySucess,
                payload: { companies: store.get('companies') }
            })

            return Promise.resolve();
        }
    }
}

function serverReqestCompanys(dispatch) {

    let requestCompanies = new api();

    return requestCompanies.setProps({
        user: {
            lang: store.get('lang'),
            token: store.get('token')
        }
    }).companies('GET', false).then((response) => {

        let companies = {};
        if (response.data) {
            response.data.forEach((item) => {
                companies[item.id] = item;
            });

            let data = { companies: companies, companyUpdate: new Date().getTime() }

            dispatch({
                type: companySucess,
                payload: data
            })

            saveStore(data);

            // this.clearSearch();
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


        } else {
            routeService.changePage('home');

        }
    }).catch((error) => {

        dispatch({ type: companyError })
        return Promise.reject(error);

    });

}