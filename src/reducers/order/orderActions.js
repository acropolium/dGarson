import api from '../../services/apiService';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as routeService from '../../services/routeService';
import store from '../../utils/storage';
import I18n from '../../services/translate.js';
import {
    COMPANY_OPDER_STATE,
    DO_ORDER,
    ADD_ITEM_ORDER,
    CHANGE_ITEM_ADDITION_ORDER,
    DIALOG_SHOWING,
    FLUSH_ORDER,
    ORDER_REQUEST,
    ORDER_ERROR,
} from '../constAction.js';
import {
    HOME_SCENE,
    COMPANIES_SCENE,
    INIT_SCENE,
    ORDER_SCENE,
    MENU_SCENE,
} from '../../scene/sceneConstant.js';
import { ORDER_CANCEL, ORDER_PENDING } from '../constOrderState.js';

export function cancelOrder(order_id, company_id) {
    return (dispatch, props) => {
        let request = new api();

        dispatchHelp(dispatch, ORDER_REQUEST);
        request.setLang(store.get('lang'));
        request.setToken(store.get('token'));

        return request
            .orders(order_id, 'PUT', { state: ORDER_CANCEL })
            .then(() => {
                routeService.changePage(MENU_SCENE);

                store.updateStore(company_id, 'order_company', false);

                dispatchHelp(dispatch, FLUSH_ORDER);
                dispatchHelp(dispatch, COMPANY_OPDER_STATE, {
                    company_id: company_id,
                    data: 'no',
                });
            })
            .catch(error => {
                dispatchHelp(dispatch, ORDER_ERROR);
                Promise.reject(error);
            });
    };
}

export function makeOrder(body, company_id) {
    return (dispatch, props) => {
        let request = new api();

        dispatchHelp(dispatch, ORDER_REQUEST);
        request.setLang(store.get('lang'));
        request.setToken(store.get('token'));

        return request
            .orders(false, 'POST', body)
            .then(response => {
                if (!ifRedirectMakeOrder(response, company_id, dispatch)) {
                    dispatchHelp(dispatch, DO_ORDER, { order: response });
                    dispatchHelp(dispatch, COMPANY_OPDER_STATE, {
                        company_id: company_id,
                        data: ORDER_PENDING,
                    });

                    store.updateStore(company_id, 'order_company', true);
                    routeService.changePage(ORDER_SCENE);
                }
            })
            .catch(error => {
                dispatchHelp(dispatch, ORDER_ERROR);
                return Promise.reject(error);
            });
    };
}

export function getOrderForCompany(companyID) {
    return (dispatch, props) => {
        let request = new api();

        dispatchHelp(dispatch, ORDER_REQUEST);
        request.setLang(store.get('lang'));
        request.setToken(store.get('token'));

        return request
            .order(companyID, 'get', false)
            .then(response => {
                if (!ifRedirectOrderCompany(response, dispatch)) {
                    let order = {
                        state: response.state,
                        order: response,
                        desired_time: response.desired_time,
                    };
                    dispatchHelp(dispatch, DO_ORDER, order);
                }
            })
            .catch(error => {
                dispatchHelp(dispatch, ORDER_ERROR);
                return Promise.reject(error);
            });
    };
}

export function removeItem(item, idx) {
    return (dispatch, props) => {
        let { order } = props();
        let copy = Object.assign({}, order);
        let keys = Object.keys(copy.draft[item.id].items);
        let index = keys[idx];

        if (copy.price.hasOwnProperty('total') && index) {
            copy.price.total =
                parseFloat(copy.price.total) -
                copy.draft[item.id].items[index.toString()].priceTotal;
        }

        if (index) delete copy.draft[item.id].items[index.toString()];

        dispatchHelp(dispatch, ADD_ITEM_ORDER, copy);
    };
}

export function addItem(item) {
    return (dispatch, props) => {
        let { order } = props();
        let copy = Object.assign({}, order);
        let itemCopy = Object.assign({}, item);

        itemCopy.options = getItemOption(item.options);
        itemCopy.countOptions = 0;

        let priceTotal = parseFloat(itemCopy.price);
        itemCopy.priceTotal = priceTotal;

        if (copy.draft.hasOwnProperty(item.id)) {
            let lastId = Object.keys(copy.draft[item.id].items).length;
            copy.draft[item.id].items[parseInt(lastId)] = itemCopy;
        } else {
            copy.draft[item.id] = {
                id: item.id,
                items: { '0': Object.assign({}, itemCopy) },
            };
        }

        copy.price.total = copy.price.hasOwnProperty('total')
            ? parseFloat(copy.price.total) + priceTotal
            : priceTotal;

        dispatchHelp(dispatch, ADD_ITEM_ORDER, copy);
    };
}

export function changeItemAddition(
    item,
    idxName,
    itemAdditionIdx,
    operation = 'add'
) {
    return (dispatch, props) => {
        let { order } = props();

        let copy = Object.assign({}, order);
        let keys = Object.keys(copy.draft[item.id].items);
        let idx = keys[idxName];

        if (operation == 'add') {
            copy.draft[item.id].items[idx].options[itemAdditionIdx].count++;
            copy.draft[item.id].items[idx].countOptions++;
            copy.draft[item.id].items[idx].priceTotal =
                copy.draft[item.id].items[idx].priceTotal +
                parseFloat(
                    copy.draft[item.id].items[idx].options[itemAdditionIdx]
                        .price
                );
            copy.price.total =
                parseFloat(copy.price.total) +
                parseFloat(
                    copy.draft[item.id].items[idx].options[itemAdditionIdx]
                        .price
                );
        } else {
            if (
                copy.draft[item.id].items[idx].options[itemAdditionIdx].count >
                0
            ) {
                copy.draft[item.id].items[idx].options[itemAdditionIdx].count--;
                copy.draft[item.id].items[idx].countOptions--;
                copy.draft[item.id].items[idx].priceTotal =
                    copy.draft[item.id].items[idx].priceTotal -
                    parseFloat(
                        copy.draft[item.id].items[idx].options[itemAdditionIdx]
                            .price
                    );
                copy.price.total =
                    parseFloat(copy.price.total) -
                    parseFloat(
                        copy.draft[item.id].items[idx].options[itemAdditionIdx]
                            .price
                    );
            }
        }

        dispatchHelp(dispatch, CHANGE_ITEM_ADDITION_ORDER, copy);
    };
}

export function setOrder(new_state, action = 'do_order') {
    return (dispatch, props) => {
        dispatch({
            type: action,
            payload: new_state,
        });
    };
}

function getItemOption(options) {
    let itemCopy = {};

    options.forEach((val, key) => {
        itemCopy[key] = { ...val };
    });
    return itemCopy;
}

function ifRedirectMakeOrder(response, company_id, dispatch) {
    if (response.hasOwnProperty('redirect')) {
        dispatchHelp(dispatch, FLUSH_ORDER);

        switch (response.status) {
            case 409:
                let errorMessages = [];
                Object.keys(response.json).forEach(function(key) {
                    errorMessages.push(response.json[key].join('\r\n'));
                });

                store.updateStore(company_id, 'menuUpdate', 0);

                dispatchHelp(dispatch, DIALOG_SHOWING, {
                    title: I18n.t('dialog_warning_title'),
                    message: errorMessages.join('\r\n'),
                    callback: () => {
                        routeService.changePage(COMPANIES_SCENE);
                    },
                });

                return true;
            case 401:
                routeService.changePage(INIT_SCENE);
                return true;
            case 302:
                dispatchHelp(dispatch, DO_ORDER, { order: response.json });
                routeService.changePage(ORDER_SCENE);
                return true;
        }
    }
    return false;
}

function ifRedirectOrderCompany(response, dispatch) {
    if (response.hasOwnProperty('redirect')) {
        dispatchHelp(dispatch, FLUSH_ORDER);

        switch (response.status) {
            case 401:
                routeService.changePage(INIT_SCENE);
                return true;
            case 404:
                routeService.changePage(MENU_SCENE);
                return true;
        }
    }
    return false;
}

function dispatchHelp(dispatch, type, payload = {}) {
    dispatch({
        type: type,
        payload: payload,
    });
}
