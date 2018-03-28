import api from '../../services/apiService';
import store from "../../utils/storage";
import * as routeService from "../../services/routeService";
import company from '../companies/companiesReducer';
import I18n from '../../services/translate.js'
import FCM from 'react-native-fcm';
import { Platform, AppState } from 'react-native';
import {
    loadInitialState,
    loadInitialStateConfirm,
    companySucess,
    menuSucess,
    setDeviceToken,
    companyOrderState, 
    updateOrderState
} from '../constAction.js';


export function sendToken(token) {

    return (dispatch, props) => {

        let { login } = props();
        let device_token = login.device_token ? login.device_token : store.get('device_token');

        sendTokenRequest(token, device_token, dispatch)

    }
}

export function loadInitialStateApp() {

    return (dispatch, props) => {

        const initialLoginStateKeys = [
            'token',
            'phone',
            'lang',
            'device_token',
            'device_token_sent'
        ];

        let initialLogin = store.getForArray(initialLoginStateKeys);

        dispatchHelp(dispatch, loadInitialState, initialLogin)
        dispatchHelp(dispatch, loadInitialStateConfirm, initialLogin)

        let companies = store.get('companies')
        if (companies)
            dispatchHelp(dispatch, companySucess, { companies: companies })

        let companyID = store.get('company')

        let companyInfo = false;
        if (companyID)
            companyInfo = store.get('company_info')[companyID];

        if (companyInfo)
            dispatchHelp(dispatch, companySucess, { 'company_info': companyInfo })

        let menu = store.get('menu')
        if (menu)
            dispatchHelp(dispatch, menuSucess, menu)

    }
}

export function getToken() {

    return (dispatch, props) => {
        return FCM.getFCMToken().then(token => {

            let device_token = store.get('device_token');

            dispatchHelp(dispatch, setDeviceToken , { device_token: store.get('device_token') })
            sendTokenRequest(token, device_token, dispatch)

        }).catch(err => {
            return Promise.resolve(false);
        });
    }

}

export function notificationHandler(notification, dialogActions) {

    return (dispatch, props) => {

        let data = getNotificationData(notification);

        if (data.hasOwnProperty('state')) {

            sendLocalNotification(notification.message);

            dispatchHelp(dispatch, companyOrderState, { company_id: data['company_id'], data: data.state })
            dispatchHelp(dispatch, updateOrderState, { orderID: data.id, state: data.state })

            let { companies } = props();
            let textMessage = companies.companies[data.company_id].name + "\r\n";;

            switch (data.state) {
                case 'ready':
                    textMessage += I18n.t('your_order_ready_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_ready_part_2');
                    dialogActions.dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(219, 194, 78, 0.8)' }, image: 'icon_ready' });
                    break;
                case 'payed':

                    updateStore(data['company_id'], "order_company", false)
                    textMessage += I18n.t('your_order_payed_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_payed_part_2');
                    dialogActions.dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(131, 187, 112, 0.8)' }, image: 'icon_payed' });
                    break;
            }
        }
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

                        store.save('device_token', token);
                        dispatchHelp(dispatch, setDeviceToken, { device_token: token, device_token_send: true })
                    }
                );
            }
        }
    }

}

function getNotificationData(notification) {

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

    return data;
}

let currentAppState;

AppState.addEventListener('change', (appState) => {
    currentAppState = appState;
    if (currentAppState == 'active') {
        FCM.removeAllDeliveredNotifications()
    }
});

function sendLocalNotification(message) {

    if (currentAppState != 'active') {
        FCM.presentLocalNotification({
            body: message,
            large_icon: "ic_notif",
            icon: "ic_notif",
            show_in_foreground: true,
        });

    }

}

function updateStore(companyID, storeName, updateData) {

    let updates = store.get(storeName);
    updates = updates ? updates : {};
    updates[companyID] = updateData;
    store.save(storeName, updates);

}

function dispatchHelp(dispatch, type, payload) {

    dispatch({
        type: type,
        payload: payload
    })
}