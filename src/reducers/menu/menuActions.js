import api from '../../services/apiService';
import moment from "moment/moment";
import store from "../../utils/storage";
import * as routeService from "../../services/routeService";
import {
    doOrder,
    menuRequest,
    menuSucess,
    menuError,
    cleanDraftOrder,
    companySucess,
    companyRequest,
    companyError
} from '../constAction.js';


export function companysMenu(companyID, readFromServer) {
    return (dispatch, props) => {

        let orderCompany = store.get("order_company");
        let currentTime = new Date().getTime();

        dispatchHelp(dispatch, companyRequest)

        if (readFromServer || (orderCompany && orderCompany[companyID]) || needUpdate(companyID, currentTime)) {

            return readFromServerMenu(companyID, props, dispatch, currentTime)

        } else {

            dispatchHelp(dispatch, cleanDraftOrder, { draft: {}, price: { total: 0 } })
            dispatchHelp(dispatch, companySucess, { company_info: store.get('company_info')[companyID] })
            dispatchHelp(dispatch, menuSucess, store.get('menu'))

            saveStore({ 'company': companyID });
            routeService.changePage('menu');

            return Promise.resolve();
        }
    }
}


function saveStore(data) {

    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}


function dispatchHelp(dispatch, type, payload) {

    dispatch({
        type: type,
        payload: payload
    })
}


function ifRedirect(response, dispatch) {

    if (response.hasOwnProperty('redirect')) {
        let orderJson = response.json;

        switch (response.status) {
            case 302:

                dispatchHelp(dispatch, doOrder, { order: orderJson, state: orderJson.state, from_company: true })
                dispatchHelp(dispatch, companySucess, { company_info: store.get('company_info')[orderJson.company_id] })

                store.save('company', orderJson.company_id)
                routeService.changePage('order');

                return true;
            case 401:

                routeService.changePage('init');

                return true;
            case 404:
                store.save('companyUpdate', 0);
                dispatchHelp(dispatch, companySucess, { needUpdate: true })
                routeService.changePage('companies');

                return true;
        }
        return false;
    }
}


function updateStore(companyID, storeName, updateData) {

    let updates = store.get(storeName);
    updates = updates ? updates : {};
    updates[companyID] = updateData;
    store.save(storeName, updates);

}


function getResponseData(response, menu, allMenuInfo) {

    let save_data = {
        company: response.company.id,
        menu: response.data || [],
    };

    if (!menu[response.company.id] || !menu[response.company.id].location) {

        if (response.company.hasOwnProperty('locations') && response.company.locations.length > 0) {
            save_data['location'] = response.company.locations[0].id;

        } else {

            save_data['location'] = false;
        }
    } else {

        save_data['location'] = allMenuInfo[response.company.id].location;
    }
    return save_data;
}


function readFromServerMenu(companyID, props, dispatch, currentTime) {

    let request = new api();

    let user = {
        user: {
            lang: store.get('lang'),
            token: store.get('token')
        }
    }

    return request.setProps(user).menu(companyID, 'get').then((response) => {
        
        if (ifRedirect(response, dispatch)) { return Promise.resolve(); }

        const { menu } = props();
        let allMenuInfo = store.get('menu') || {};
        let save_data = getResponseData(response, menu, allMenuInfo)

        dispatchHelp(dispatch, cleanDraftOrder, { draft: {}, price: { total: 0 } });
        dispatchHelp(dispatch, companySucess, { company_info: response.company })

        allMenuInfo[response.company.id] = save_data;
        dispatchHelp(dispatch, menuSucess, allMenuInfo)

        saveStore({ 'company': response.company.id, });
        updateStore(response.company.id, "menuUpdate", currentTime);
        updateStore(response.company.id, 'menu', save_data);
        updateStore(response.company.id, 'company_info', response.company)

        routeService.changePage('menu');
        return Promise.resolve();

    }).catch((error) => {
        dispatchHelp(dispatch, companyError)
        return Promise.reject(error);
    })

}

let timeUpdate = 20000000;

function needUpdate(companyID, currentTime) {

    let updatesTimes = store.get('menuUpdate');
    updatesTimes = updatesTimes || {};
    let lastTime = updatesTimes[companyID] || 0;

    return currentTime - lastTime > timeUpdate;
}

