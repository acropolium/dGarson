import api from '../../services/apiService'
import { Actions, ActionConst } from 'react-native-router-flux'
import * as routeService from '../../services/routeService'
import store from '../../utils/storage'
import I18n from '../../services/translate.js'
import {
    companyOrderState,
    doOrder,
    addItemOrder,
    changeItemAdditionOrder,
    dialogShowing,
    flushOrder,
    orderRequest,
    ordeError
} from '../constAction.js'

export function cancelOrder(order_id, company_id) {
    return (dispatch, props) => {
        let request = new api()
        dispatchHelp(dispatch, orderRequest)

        return request
            .orders(order_id, 'PUT', { state: 'cancel' })
            .then(() => {
                routeService.changePage('menu')

                updateStore(company_id, 'order_company', false)

                dispatchHelp(dispatch, flushOrder)
                dispatchHelp(dispatch, companyOrderState, {
                    company_id: company_id,
                    data: 'no'
                })
            })
            .catch(error => {
                dispatchHelp(dispatch, ordeError)
                Promise.reject(error)
            })
    }
}

export function makeOrder(body, company_id) {
    return (dispatch, props) => {
        let request = new api()
        dispatchHelp(dispatch, orderRequest)

        return request
            .orders(false, 'POST', body)
            .then(response => {
                if (!ifRedirectMakeOrder(response, company_id, dispatch)) {
                    dispatchHelp(dispatch, doOrder, { order: response })
                    dispatchHelp(dispatch, companyOrderState, {
                        company_id: company_id,
                        data: 'pending'
                    })

                    updateStore(company_id, 'order_company', true)
                    routeService.changePage('order')
                }
            })
            .catch(error => {
                dispatchHelp(dispatch, ordeError)
                return Promise.reject(error)
            })
    }
}

export function getOrderForCompany(companyID) {
    return (dispatch, props) => {
        let request = new api()
        dispatchHelp(dispatch, orderRequest)
        return request
            .order(companyID, 'get', false)
            .then(response => {
                if (!ifRedirectOrderCompany(response, dispatch)) {
                    let order = {
                        state: response.state,
                        order: response,
                        desired_time: response.desired_time
                    }
                    dispatchHelp(dispatch, doOrder, order)
                }
            })
            .catch(error => {
                dispatchHelp(dispatch, ordeError)
                return Promise.reject(error)
            })
    }
}

export function removeItem(item, idx) {
    return (dispatch, props) => {
        let { order } = props()
        let copy = Object.assign({}, order)
        let keys = Object.keys(copy.draft[item.id].items)
        let index = keys[idx]

        if (copy.price.hasOwnProperty('total') && index) {
            copy.price.total =
                parseFloat(copy.price.total) -
                copy.draft[item.id].items[index.toString()].priceTotal
        }

        if (index) delete copy.draft[item.id].items[index.toString()]

        dispatchHelp(dispatch, addItemOrder, copy)
    }
}

export function addItem(item) {
    return (dispatch, props) => {
        let { order } = props()
        let copy = Object.assign({}, order)
        let itemCopy = Object.assign({}, item)

        itemCopy.options = getItemOption(item.options)
        itemCopy.countOptions = 0

        let priceTotal = parseFloat(itemCopy.price)
        itemCopy.priceTotal = priceTotal

        if (copy.draft.hasOwnProperty(item.id)) {
            let lastId = Object.keys(copy.draft[item.id].items).length
            copy.draft[item.id].items[parseInt(lastId)] = itemCopy
        } else {
            copy.draft[item.id] = {
                id: item.id,
                items: { '0': Object.assign({}, itemCopy) }
            }
        }

        copy.price.total = copy.price.hasOwnProperty('total')
            ? parseFloat(copy.price.total) + priceTotal
            : priceTotal

        dispatchHelp(dispatch, addItemOrder, copy)
    }
}

export function changeItemAddition(
    item,
    idxName,
    itemAdditionIdx,
    operation = 'add'
) {
    return (dispatch, props) => {
        let { order } = props()

        let copy = Object.assign({}, order)
        let keys = Object.keys(copy.draft[item.id].items)
        let idx = keys[idxName]

        if (operation == 'add') {
            copy.draft[item.id].items[idx].options[itemAdditionIdx].count++
            copy.draft[item.id].items[idx].countOptions++
            copy.draft[item.id].items[idx].priceTotal =
                copy.draft[item.id].items[idx].priceTotal +
                parseFloat(
                    copy.draft[item.id].items[idx].options[itemAdditionIdx]
                        .price
                )
            copy.price.total =
                parseFloat(copy.price.total) +
                parseFloat(
                    copy.draft[item.id].items[idx].options[itemAdditionIdx]
                        .price
                )
        } else {
            if (
                copy.draft[item.id].items[idx].options[itemAdditionIdx].count >
                0
            ) {
                copy.draft[item.id].items[idx].options[itemAdditionIdx].count--
                copy.draft[item.id].items[idx].countOptions--
                copy.draft[item.id].items[idx].priceTotal =
                    copy.draft[item.id].items[idx].priceTotal -
                    parseFloat(
                        copy.draft[item.id].items[idx].options[itemAdditionIdx]
                            .price
                    )
                copy.price.total =
                    parseFloat(copy.price.total) -
                    parseFloat(
                        copy.draft[item.id].items[idx].options[itemAdditionIdx]
                            .price
                    )
            }
        }

        dispatchHelp(dispatch, changeItemAdditionOrder, copy)
    }
}

export function setOrder(new_state, action = 'do_order') {
    return (dispatch, props) => {
        dispatch({
            type: action,
            payload: new_state
        })
    }
}

function getItemOption(options) {
    let itemCopy = {}

    options.forEach((val, key) => {
        itemCopy[key] = { ...val }
    })
    return itemCopy
}

function ifRedirectMakeOrder(response, company_id, dispatch) {
    if (response.hasOwnProperty('redirect')) {
        dispatchHelp(dispatch, flushOrder)

        switch (response.status) {
            case 409:
                let errorMessages = []
                Object.keys(response.json).forEach(function(key) {
                    errorMessages.push(response.json[key].join('\r\n'))
                })

                updateStore(company_id, 'menuUpdate', 0)

                dispatchHelp(dispatch, dialogShowing, {
                    title: I18n.t('dialog_warning_title'),
                    message: errorMessages.join('\r\n'),
                    callback: () => {
                        routeService.changePage('companies')
                    }
                })

                return true
            case 401:
                routeService.changePage('init')
                return true
            case 302:
                dispatchHelp(dispatch, doOrder, { order: response.json })
                routeService.changePage('order')
                return true
        }
    }
    return false
}

function ifRedirectOrderCompany(response, dispatch) {
    if (response.hasOwnProperty('redirect')) {
        dispatchHelp(dispatch, flushOrder)

        switch (response.status) {
            case 401:
                routeService.changePage('init')
                return true
            case 404:
                routeService.changePage('menu')
                return true
        }
    }
    return false
}

function updateStore(companyID, storeName, updateData) {
    let updates = store.get(storeName)
    updates = updates ? updates : {}
    updates[companyID] = updateData
    store.save(storeName, updates)
}

function dispatchHelp(dispatch, type, payload = {}) {
    dispatch({
        type: type,
        payload: payload
    })
}
