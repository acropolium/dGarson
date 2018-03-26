import api from '../../services/apiService';

import store from "../../utils/storage";
import * as routeService from "../../services/routeService";
import company from '../companies/companiesReducer';
import I18n from '../../services/translate.js'
import FCM from 'react-native-fcm';
import { Platform } from 'react-native';


export function sendToken(token) {

    return (dispatch, props) => {

        let { login } = props();
        let device_token = login.device_token ? login.device_token : store.get('device_token');

        sendTokenRequest(token, device_token, dispatch)

    }
}


export function loadInitialState() {

    return (dispatch, props) => {

        let companies = store.get('companies')
        if (companies)
            dispatch({
                type: 'companySucess',
                payload: { companies: companies }
            })

        let companyID = store.get('company')
        
        let companyInfo = false;
        if (companyID)
            companyInfo = store.get('company_info')[companyID];

        if (companyInfo)
            dispatch({
                type: 'companySucess',
                payload: { 'company_info': companyInfo }
            })

        let menu = store.get('menu')
        if (menu)
            dispatch({
                type: 'menuSucess',
                payload: menu
            })
    }

}

function sendTokenRequest(token, currentToken, dispatch) {

    if (token) {
        let device_token = currentToken;
        if (device_token !== token) {
            if (token !== false) {

                let request = (new api()).setProps({
                    user: {
                        lang: store.get('lang'),
                        token: store.get('token')
                    }
                });
                request.device_token('PUT', { device_token: token, platform: Platform.OS }, false,
                    () => {
                        alert(token)
                        store.save('device_token', token);
                        dispatch({
                            type: "setDeviceToken",
                            payload: { device_token: token, device_token_send: true }
                        })
                    }
                );
            }
        }
    }

}

export function getToken() {

    return (dispatch, props) => {
        return FCM.getFCMToken().then(token => {

            let device_token = store.get('device_token');

            dispatch({
                type: "setDeviceToken",
                payload: { device_token: store.get('device_token') }
            })
            sendTokenRequest(token, device_token, dispatch)

        }).catch(err => {
            return Promise.resolve(false);
        });
    }

}


export function notificationHandler(notification, dialogActions) {

    return (dispatch, props) => {
        let prefix = 'order_';
        let data = {};

        Object.keys(notification).forEach((key) => {
            if (key.indexOf(prefix) > -1) {
                data[key.substr(prefix.length)] = notification[key]
            }
        });

        if (notification.hasOwnProperty('data') && Platform.OS === 'ios') {
            Object.keys(notification.data).forEach((key) => {
                if (key.indexOf(prefix) > -1) {
                    data[key.substr(prefix.length)] = notification.data[key]
                }
            });
        }

        if (data.hasOwnProperty('state')) {

            let { login } = props();

           /* if (!login.token) {

                let page = store.get('state');
                routeService.changePage(page ? page : 'init');
            }*/

            dispatch({
                type: "companyOrderState",
                payload: { company_id: data['company_id'], data: data.state }
            })

            dispatch({
                type: 'update_order_state',
                payload: { orderID: data.id, state: data.state },

            })

            let { companies } = props();
            let textMessage = companies.companies[data.company_id].name + "\r\n";;
            switch (data.state) {
                case 'ready':
                    textMessage += I18n.t('your_order_ready_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_ready_part_2');
                    dialogActions.dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(219, 194, 78, 0.8)' }, image: 'icon_ready' });
                    break;
                case 'payed':

                    let order_company = store.get("order_company");
                    order_company = order_company ? order_company : {};
                    order_company[data['company_id']] = false;
                    store.save("order_company", order_company);

                    textMessage += I18n.t('your_order_payed_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_payed_part_2');
                    dialogActions.dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(131, 187, 112, 0.8)' }, image: 'icon_payed' });
                    break;
            }
        }
    }
}