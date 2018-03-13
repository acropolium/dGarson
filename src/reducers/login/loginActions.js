import * as routeService from "../../services/routeService";
import api from '../../services/apiService';
import { Platform } from 'react-native';
import store from '../../utils/storage';
import {

    loadInitialState,
    registerRequest,
    registerRequestSuccess,
    registerRequestError,
    verifyRequest,
    verifySucess,
    companySucess,
    verifyError,
    loadInitialStateConfirm
} from './constatntReducer.js';

const initialLognStateKeys = [
    'token',
    'phone',
    'lang',
    'device_token',
    'device_token_sent'
];


export function loadDataHome(type, data) {

    return (dispatch, props) => {
        dispatch({
            type: type,
            payload: data
        })
    }
}

export function loadInitialStateAct() {

    return (dispatch, props) => {
        dispatch({
            type: loadInitialState,
            payload: store.getForArray(initialLognStateKeys)
        })
    }
}


export function sendData(userData, phone) {

    return (dispatch, props) => {

        dispatch({ type: registerRequest })

        const { user } = props();
        let device_token = user['device_token'];
        let request = new api();

        return request.setProps(userData).register('POST', {
            phone: phone,
            device_token: device_token,
            platform: Platform.OS
        }).
            then((responseData) => {

                let data = {
                    phone: phone,
                    device_token: device_token,
                    device_token_sent: true
                };
                Object.keys(data).forEach(async key => {
                    await store.save(key, data[key]);
                });


                dispatch({ type: registerRequestSuccess, payload: data })
                routeService.changePage('confirm')

            })
            .catch((error) => {

                dispatch({ type: registerRequestError });
                return Promise.reject(error);

            });
    }
}

export function loadInitialStateConfirmAct() {

    return (dispatch, props) => {
        dispatch({
            type: loadInitialStateConfirm,
            payload: store.getForArray(initialLognStateKeys)
        })
    }
}

function saveSrore(data) {

    Object.keys(data).forEach(async key => {
        await store.save(key, data[key]);
    });
}

export function sendConfirm(userData, confirmData) {
    return (dispatch, props) => {

        dispatch({ type: verifyRequest })

        return (new api()).setProps(userData).verify('POST', confirmData).then((response) => {

            let api_token = response.api_token;

            let data = {
                token: api_token,
                state: 'companies'
            };

            
            dispatch({ type: verifySucess, payload: data })
            saveSrore(data);

            userData.user.token = api_token;

            return (new api()).setProps(userData).companies('GET', false);

        }).then((response) => {
           
            if (response.data.length == 1) {

                let data = {
                    company_info: response.data[0],
                    company: response.data[0].id,
                };

               

                if (response.data[0].hasOwnProperty('locations')) {
                    data['location'] = response.data[0].locations[0].id;
                }

                dispatch({ type: 'loadDataConfirm', payload: data })
                saveSrore(data);
                routeService.changePage('menu');
            } else {

                let companies = {};
                response.data.forEach((item) => {
                    companies[item.id] = item;
                });

                let data = { companies: companies };
                dispatch({ type: companySucess, payload: data })
                saveSrore(data);
                routeService.changePage('companies');
            }
        }).catch((error) => {

            dispatch({ type: verifyError });
            return Promise.reject(error);

        });
    }

}

