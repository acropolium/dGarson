import api from '../../services/apiService';
import moment from "moment/moment";
import store from "../../utils/storage";
import * as routeService from "../../services/routeService";
import {

    menuRequest,
    menuSucess,
    menuError
} from './constatntReducer.js';

function saveStore(data) {

    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}


export function getMenuFromStorage() {

    return (dispatch, props) => {
        dispatch({
            type: menuRequest,

        })

        /*dispatch({
            type: 'companySucess',
            payload: { companies: store.get('companies') }
        })


        dispatch({
            type: 'companySucess',
            payload: { 'company_info': store.get('company_info')[store.get('company')] }
        })


        dispatch({
            type: menuSucess,
            payload: store.get('menu')
        })*/
    }
}
let timeUpdate = 20000;

export function companysMenu(companyID) {


    return (dispatch, props) => {


        let orderCompany = store.get("order_company");

        let updatesTimes = store.get('menuUpdate');
        alert(JSON.stringify(updatesTimes))
         updatesTimes = updatesTimes || {};
        let lastTime = updatesTimes[companyID] || 0;

        let currentTime = new Date().getTime();
        let needUpdate = currentTime - lastTime > timeUpdate;

        if (orderCompany && orderCompany[companyID] || needUpdate) {
           // alert("readFromServer")

            let updatesTime = store.get("order_company");
            updatesTime = updatesTime ? updatesTime : {};
            updatesTime[companyID] = currentTime;
            store.save('menuUpdate', updatesTime);
        }

        let request = new api();

        request.setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        }).menu(companyID, 'get').then((response) => {


            if (response.hasOwnProperty('redirect')) {
                let orderJson = response.json;

                switch (response.status) {
                    case 302:

                        dispatch({
                            type: 'do_order',
                            payload: { order: orderJson, state: orderJson.state }
                        })

                        dispatch({
                            type: 'companySucess',
                            payload: { company_info: store.get('company_info')[orderJson.company_id] }
                        })

                        store.save('company', orderJson.company_id)
                        routeService.changePage('order');
                        break;
                    case 401:
                        //this.props.spinnerActions.hide();
                        //await userService.changePage('init', { read_from_storage: true });
                        alert(401)
                        // routeService.changePage('init');
                        break;

                    case 404:
                        alert(404 + "sdlkf")
                        //this.props.spinnerActions.hide();
                        //await userService.changePage('companies', { read_from_storage: true });
                        // routeService.changePage('companies');
                        break;


                }
                return;
            }


            let save_data = {
                company: response.company.id,
                menu: response.data || [],
                // menus: []//this.props.user.menus || []
            };

            const { menu } = props();
            let allMenuInfo = store.get('menu');
            allMenuInfo = allMenuInfo ? allMenuInfo : {};
            if (!allMenuInfo[response.company.id] || !allMenuInfo[response.company.id].location) {

                if (response.company.hasOwnProperty('locations') && response.company.locations.length > 0) {
                    save_data['location'] = response.company.locations[0].id;

                } else {
                    save_data['location'] = false;

                }
            } else {

                save_data['location'] = allMenuInfo[response.company.id].location;

            }



            dispatch({
                type: 'clean_draft_order',
                payload: { draft: {}, price: { total: 0 } }
            })

            dispatch({
                type: 'companySucess',
                payload: { company_info: response.company }
            })

            allMenuInfo[response.company.id] = save_data;
            saveStore({ 'menu': allMenuInfo, 'company': response.company.id, });

            dispatch({
                type: menuSucess,
                payload: allMenuInfo
            })

            //saveStore(save_data);

            let allCompanyInfo = store.get('company_info');
            allCompanyInfo = allCompanyInfo ? allCompanyInfo : {};
            allCompanyInfo[response.company.id] = response.company;
            saveStore({ 'company_info': allCompanyInfo });

            routeService.changePage('menu');

        })

    }
}