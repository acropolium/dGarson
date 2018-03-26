import api from '../../services/apiService';
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

function saveStore(data) {

    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}

let timeUpdate = 60000000000;

export function getItemsFromStorage(readFromServer = false) {

    return (dispatch, props) => {

        // dispatch({ type: companyRequest })

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

            let data = { companies: companies, companyUpdate: new Date().getTime(), needUpdate: false }

            dispatch({
                type: companySucess,
                payload: data
            })

            saveStore(data);
        } else {
            routeService.changePage('home');

        }
    }).catch((error) => {

        dispatch({ type: companyError })
        return Promise.reject(error);

    });

}