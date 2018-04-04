import api from '../../services/apiService'
import moment from 'moment/moment'
import store from '../../utils/storage'
import * as routeService from '../../services/routeService'
import {
    DO_ORDER,
    MENU_SUCCES,
    COMPANY_SUCCES,
    COMPANY_REQUEST,
    COMPANY_ERROR,
    FLUSH_ORDER
} from '../constAction.js'
import {
    INIT_SCENE,
    COMPANIES_SCENE,
    ORDER_SCENE,
    MENU_SCENE
} from '../../scene/sceneConstant.js'

export function companysMenu(companyID, readFromServer) {
    return (dispatch, props) => {
        let orderCompany = store.get('order_company')
        let currentTime = new Date().getTime()

        dispatchHelp(dispatch, COMPANY_REQUEST)

        if (
            readFromServer ||
            (orderCompany && orderCompany[companyID]) ||
            needUpdate(companyID, currentTime)
        ) {

            return readFromServerMenu(companyID, props, dispatch, currentTime)
        } else {

            dispatchHelp(dispatch, FLUSH_ORDER)
            dispatchHelp(dispatch, COMPANY_SUCCES, {
                company_info: store.get('company_info')[companyID]
            })
            dispatchHelp(dispatch, MENU_SUCCES, store.get('menu'))

            saveStore({ company: companyID })
            routeService.changePage(MENU_SCENE)

            return Promise.resolve()
        }
    }
}

function saveStore(data) {
    Object.keys(data).forEach(key => {
        store.save(key, data[key])
    })
}

function dispatchHelp(dispatch, type, payload) {
    dispatch({
        type: type,
        payload: payload
    })
}

function ifRedirect(response, dispatch) {
    if (response.hasOwnProperty('redirect')) {
        let orderJson = response.json

        switch (response.status) {
            case 302:
                dispatchHelp(dispatch, DO_ORDER, {
                    order: orderJson,
                    desired_time: orderJson.desired_time,
                    state: orderJson.state,
                    from_company: true
                })
                dispatchHelp(dispatch, COMPANY_SUCCES, {
                    company_info: store.get('company_info')[
                        orderJson.company_id
                    ]
                })

                store.save('company', orderJson.company_id)
                routeService.changePage(ORDER_SCENE)

                return true
            case 401:
                routeService.changePage(INIT_SCENE)

                return true
            case 404:
                store.save('companyUpdate', 0)
                dispatchHelp(dispatch, COMPANY_SUCCES, { needUpdate: true })
                routeService.changePage(COMPANIES_SCENE)

                return true
        }
        return false
    }
}

function getResponseData(response, menu, allMenuInfo) {
    let save_data = {
        company: response.company.id,
        menu: response.data || []
    }

    if (!menu[response.company.id] || !menu[response.company.id].location) {
        if (
            response.company.hasOwnProperty('locations') &&
            response.company.locations.length > 0
        ) {
            save_data['location'] = response.company.locations[0].id
        } else {
            save_data['location'] = false
        }
    } else {
        save_data['location'] = allMenuInfo[response.company.id].location
    }
    return save_data
}

function readFromServerMenu(companyID, props, dispatch, currentTime) {
    let request = new api()

    request.setLang(store.get('lang'))
    request.setToken(store.get("token"))

    return request
        .menu(companyID, 'get')
        .then(response => {
            if (ifRedirect(response, dispatch)) {
                return Promise.resolve()
            }

            const { menu } = props()
            let allMenuInfo = store.get('menu') || {}
            let save_data = getResponseData(response, menu, allMenuInfo)

            dispatchHelp(dispatch, FLUSH_ORDER)
            dispatchHelp(dispatch, COMPANY_SUCCES, {
                company_info: response.company
            })
            
            allMenuInfo[response.company.id] = save_data
            dispatchHelp(dispatch, MENU_SUCCES, allMenuInfo)

            saveStore({ company: response.company.id })
            store.updateStore(response.company.id, 'menuUpdate', currentTime)
            store.updateStore(response.company.id, 'menu', save_data)
            store.updateStore(response.company.id, 'company_info', response.company)

            routeService.changePage(MENU_SCENE)
            return Promise.resolve()
        })
        .catch(error => {
            dispatchHelp(dispatch, COMPANY_ERROR)
            return Promise.reject(error)
        })
}

let timeUpdate = 20000000

function needUpdate(companyID, currentTime) {
    let updatesTimes = store.get('menuUpdate')
    updatesTimes = updatesTimes || {}
    let lastTime = updatesTimes[companyID] || 0

    return currentTime - lastTime > timeUpdate
}
