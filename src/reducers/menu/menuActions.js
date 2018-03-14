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

        dispatch({
            type: 'companySucess',
            payload: store.getForArray(['company_info'])
        })

        dispatch({
            type: menuSucess,
            payload: store.getForArray(['company', 'menu', 'location'])
        })
    }
}


export function companysMenu(itemID) {

    return (dispatch, props) => {

        let request = new api();

        const { menu } = props();
        request.setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        }).menu(itemID, 'get').then((response) => {


            // alert(JSON.stringify(response))
            if (response.hasOwnProperty('redirect')) {
                let orderJson = response.json;

                switch (response.status) {
                    case 302:
                        //this.props.spinnerActions.hide();
                        // routeService.changePage('order');
                        //await orderService.setOrder({ order: orderJson, state: orderJson.state });
                        //  await userService.changePage('order');

                        alert(302)
                        break;
                    case 401:
                        //this.props.spinnerActions.hide();
                        //await userService.changePage('init', { read_from_storage: true });
                        alert(401)
                        // routeService.changePage('init');
                        break;

                    case 404:
                        alert(404)
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
                menus: []//this.props.user.menus || []
            };

            //save_data.menus[response.company.id] = response.data || [];
            if (!menu.location) {

                if (response.company.hasOwnProperty('locations') && response.company.locations.length > 0) {
                    save_data['location'] = response.company.locations[0].id;

                } else {
                    save_data['location'] = false;
                }
            }

            //????????await orderService.resetOrder(false);
            dispatch({
                type: 'companySucess',
                payload: { company_info: response.company }
            })


            dispatch({
                type: menuSucess,
                payload: save_data
            })

            saveStore(save_data);


            routeService.changePage('menu');

        })

    }
}