import api from '../../services/apiService'
import store from '../../utils/storage'
import * as routeService from '../../services/routeService'
import company from '../companies/companiesReducer'
import I18n from '../../services/translate.js'
import FCM from 'react-native-fcm'
import { Platform, AppState } from 'react-native'
import {
    LOAD_INITIAL_STATE,
    LOAD_INITIAL_STATE_CONFIRM,
    COMPANY_SUCCES,
    MENU_SUCCES,
    SET_DEVICE_TOKEN,
    COMPANY_OPDER_STATE,
    UPDATE_ORDER_STATE,
    DO_ORDER
} from '../constAction.js'
import {
    ORDER_READY,
    ORDER_PAYED
} from '../constOrderState.js'

export function sendToken(token) {
    return (dispatch, props) => {
        let { login } = props()
        let device_token = login.device_token
            ? login.device_token
            : store.get('device_token')

        sendTokenRequest(token, device_token, dispatch)
    }
}

const initialLoginStateKeys = [
    'token',
    'phone',
    'lang',
    'device_token',
    'device_token_sent'
]

export function loadInitialStateApp() {
    return (dispatch, props) => {
        store.save('lang', I18n.locale)

        let initialLogin = store.getForArray(initialLoginStateKeys)

        dispatchHelp(dispatch, LOAD_INITIAL_STATE, initialLogin)
        dispatchHelp(dispatch, LOAD_INITIAL_STATE_CONFIRM, initialLogin)

        AppState.addEventListener('change', appState => {
            if (appState == 'active') {
                FCM.removeAllDeliveredNotifications()

                let companies = store.get('companies')
                let companyID = store.get('company')

                let companyInfo = false
                if (companyID) companyInfo = store.get('company_info')[companyID]

                dispatchHelp(dispatch, COMPANY_SUCCES, {
                    company_info: companyInfo,
                    companies: companies,
                    needUpdate: true,
                    needUpdateFromServer: true
                })

                dispatchHelp(dispatch, DO_ORDER, { needUpdateFromServer: true })
            }
        })

        let menu = store.get('menu')
        if (menu) dispatchHelp(dispatch, MENU_SUCCES, menu)
    }
}

export function getToken() {
    return (dispatch, props) => {
        return FCM.getFCMToken()
            .then(token => {
                let device_token = store.get('device_token')
                sendTokenRequest(token, device_token, dispatch)
            })
            .catch(err => {
                return Promise.reject(false)
            })
    }
}

export function notificationHandler(notification, dialogActions) {
    return (dispatch, props) => {
        let data = getNotificationData(notification)

        if (data.hasOwnProperty('state')) {

            dispatchHelp(dispatch, COMPANY_OPDER_STATE, {
                company_id: data['company_id'],
                data: data.state
            })
            dispatchHelp(dispatch, UPDATE_ORDER_STATE, {
                orderID: data.id,
                state: data.state
            })

            let { companies } = props()
            let textMessage = companies.companies[data.company_id].name + '\r\n'

            switch (data.state) {
                case ORDER_READY:
                    textMessage +=
                        I18n.t('your_order_ready_part_1') +
                        ' #' +
                        data.id +
                        ' ' +
                        I18n.t('your_order_ready_part_2')
                    dialogActions.dialogShow({
                        message: textMessage,
                        overlayStyle: {
                            backgroundColor: 'rgba(219, 194, 78, 0.8)'
                        },
                        image: 'icon_ready'
                    })
                    break
                case ORDER_PAYED:
                    store.updateStore(data['company_id'], 'order_company', false)
                    textMessage +=
                        I18n.t('your_order_payed_part_1') +
                        ' #' +
                        data.id +
                        ' ' +
                        I18n.t('your_order_payed_part_2')
                    dialogActions.dialogShow({
                        message: textMessage,
                        overlayStyle: {
                            backgroundColor: 'rgba(131, 187, 112, 0.8)'
                        },
                        image: 'icon_payed'
                    })
                    break
            }
        }
    }
}

function sendTokenRequest(token, currentToken, dispatch) {
    if (token && token !== false) {
        let request = new api()

        request.setLang(store.get('lang'))
        request.setToken(store.get('token'))

        request
            .device_token('PUT', { device_token: token, platform: Platform.OS })
            .then(() => {
                store.save('device_token', token)
                dispatchHelp(dispatch, SET_DEVICE_TOKEN, {
                    device_token: token,
                    device_token_send: true
                })
            })
    }
}

function getNotificationData(notification) {
    let prefix = 'order_'
    let data = {}

    Object.keys(notification).forEach(key => {
        if (key.indexOf(prefix) > -1) {
            data[key.substr(prefix.length)] = notification[key]
        }
    })

    if (notification.hasOwnProperty('data') && Platform.OS === 'ios') {
        Object.keys(notification.data).forEach(key => {
            if (key.indexOf(prefix) > -1) {
                data[key.substr(prefix.length)] = notification.data[key]
            }
        })
    }

    return data
}

function dispatchHelp(dispatch, type, payload) {
    dispatch({
        type: type,
        payload: payload
    })
}
