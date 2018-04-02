import api from '../../services/apiService'
import store from '../../utils/storage'
import * as routeService from '../../services/routeService'
import { companyRequest, companySucess, companyError } from '../constAction.js'

export function getItemsFromStorage(readFromServer = false) {
    return (dispatch, props) => {
        if (needUpdate() || readFromServer) {
            dispatchHelp(dispatch, companyRequest, {})
            return serverReqestCompanys(dispatch)
        } else {
            dispatchHelp(dispatch, companySucess, {
                companies: store.get('companies')
            })

            return Promise.resolve()
        }
    }
}

let timeUpdate = 2000000

function needUpdate() {
    let lastTime = store.get('companyUpdate')
    let currentTime = new Date().getTime()

    return !Number.isInteger(lastTime) || currentTime - lastTime > timeUpdate
}

function serverReqestCompanys(dispatch) {
    let requestCompanies = new api()
    
    requestCompanies.setLang(store.get('lang'))
    requestCompanies.setToken(store.get('token'))

    return requestCompanies
        .companies('GET')
        .then(response => {
            let companies = {}

            if (response.data) {
                response.data.forEach(item => {
                    companies[item.id] = item
                })

                let data = {
                    companies: companies,
                    companyUpdate: new Date().getTime()
                }

                dispatchHelp(dispatch, companySucess, data)

                saveStore(data)
            } else {
                routeService.changePage('home')
            }
        })
        .catch(error => {
            dispatch({ type: companyError })
            return Promise.reject(error)
        })
}

function dispatchHelp(dispatch, type, payload) {
    dispatch({
        type: type,
        payload: payload
    })
}

function saveStore(data) {
    Object.keys(data).forEach(async key => {
        await store.save(key, data[key])
    })
}
