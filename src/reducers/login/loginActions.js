import * as routeService from '../../services/routeService'
import api from '../../services/apiService'
import { Platform } from 'react-native'
import store from '../../utils/storage'
import {
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS, 
    REGISTER_REQUEST_ERROR,
    VERIFY_REQUEST,
    VERIFY_SUCCES,
    COMPANY_SUCCES,
    VERIFY_ERROR
} from '../constAction.js'

export function loadDataHome(type, data) {
    return (dispatch, props) => {
        dispatch({
            type: type,
            payload: data
        })
    }
}

export function sendData(phone) {
    return (dispatch, props) => {
        dispatch({ type: REGISTER_REQUEST })

        const { login } = props()
        let device_token = login.device_token
        let request = new api()

        request.setLang(store.get('lang'))

        return request
            .register('POST', {
                phone: phone,
                device_token: device_token,
                platform: Platform.OS
            })
            .then(responseData => {
                let data = {
                    phone: phone,
                    device_token: device_token,
                    device_token_sent: true
                }
                saveStore(data)

                dispatch({ type: REGISTER_REQUEST_SUCCESS,payload: data })
                routeService.changePage('confirm')
            })
            .catch(error => {
                dispatch({ type: REGISTER_REQUEST_ERROR })
                return Promise.reject(error)
            })
    }
}

export function sendConfirm(confirmData) {
    return (dispatch, props) => {
        dispatch({ type: VERIFY_REQUEST })

        let request = new api()

        request.setLang(store.get('lang'))
        request.setToken(store.get("token"))

        return request
            .verify('POST', confirmData)
            .then(response => {
                let api_token = response.api_token

                let data = {
                    token: api_token,
                    state: 'companies'
                }

                dispatch({ type: VERIFY_SUCCES, payload: data })
                saveStore(data)

                let request = new api()
                request.setLang(store.get('lang'))
                request.setToken(store.get("token"))

                return request.companies('GET', false)
            })
            .then(response => {
                let companies = {}
                response.data.forEach(item => {
                    companies[item.id] = item
                })

                let data = { companies: companies }
                dispatch({ type: COMPANY_SUCCES, payload: data })
                saveStore(data)
                routeService.changePage('companies')
            })
            .catch(error => {
                dispatch({ type: VERIFY_ERROR})
                return Promise.reject(error)
            })
    }
}

function saveStore(data) {
    Object.keys(data).forEach(async key => {
        await store.save(key, data[key])
    })
}
