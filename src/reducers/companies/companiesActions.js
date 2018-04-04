import api from '../../services/apiService';
import store from '../../utils/storage';
import * as routeService from '../../services/routeService';
import {
    COMPANY_REQUEST,
    COMPANY_SUCCES,
    COMPANY_ERROR,
} from '../constAction.js';
import { HOME_SCENE } from '../../scene/sceneConstant.js';

export function getItemsFromStorage(readFromServer = false) {
    return (dispatch, props) => {
        if (needUpdate() || readFromServer) {
            dispatchHelp(dispatch, COMPANY_REQUEST, {});
            return serverReqestCompanys(dispatch);
        } else {
            dispatchHelp(dispatch, COMPANY_SUCCES, {
                companies: store.get('companies'),
            });

            return Promise.resolve();
        }
    };
}

let timeUpdate = 2000000;

function needUpdate() {
    let lastTime = store.get('companyUpdate');
    let currentTime = new Date().getTime();

    return !Number.isInteger(lastTime) || currentTime - lastTime > timeUpdate;
}

function serverReqestCompanys(dispatch) {
    let requestCompanies = new api();

    requestCompanies.setLang(store.get('lang'));
    requestCompanies.setToken(store.get('token'));

    return requestCompanies
        .companies('GET')
        .then(response => {
            let companies = {};

            if (response.data) {
                response.data.forEach(item => {
                    if (!item.latest_order)
                        store.updateStore(item.id, 'order_company', false);

                    companies[item.id] = item;
                });

                let data = {
                    companies: companies,
                    companyUpdate: new Date().getTime(),
                };

                dispatchHelp(dispatch, COMPANY_SUCCES, data);

                saveStore(data);
            } else {
                routeService.changePage(HOME_SCENE);
            }
        })
        .catch(error => {
            dispatch({ type: COMPANY_ERROR });
            return Promise.reject(error);
        });
}

function dispatchHelp(dispatch, type, payload) {
    dispatch({
        type: type,
        payload: payload,
    });
}

function saveStore(data) {
    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}
