import api from '../../services/apiService';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as routeService from "../../services/routeService";
import store from "../../utils/storage";
import I18n from '../../services/translate.js'

export function getDataByKey(key, defaultValue = false) {
    return (dispatch, props) => {
        const { order } = props();

        if (order.hasOwnProperty(key)) {
            return order[key];
        } else {
            return defaultValue || null;
        }
    }
}

export function hasKey(key) {
    return (dispatch, props) => {
        return props().user.hasOwnProperty(key);
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

export function removeItem(item, idx) {
    return (dispatch, props) => {
        let { order } = props();
        let copy = Object.assign({}, order);
        let keys = Object.keys(copy.draft[item.id].items);
        let index = keys[idx];

        if (copy.price.hasOwnProperty('total') && index) {
            copy.price.total = parseFloat(copy.price.total) - copy.draft[item.id].items[index.toString()].priceTotal;
        }

        if (index)
            delete copy.draft[item.id].items[index.toString()];


        return dispatch({
            type: 'add_item',
            payload: copy
        })
    }
}

export function addItem(item) {
    return (dispatch, props) => {

        let { order } = props();

        let copy = Object.assign({}, order);
        let itemCopy = Object.assign({}, item);

        itemCopy.options = {};
        let countOptions = 0;
        let priceTotal = parseFloat(itemCopy.price);

        item.options.forEach((val, key) => {
            itemCopy.options[key] = {};
            Object.keys(val).forEach((skey) => {
                itemCopy.options[key][skey] = val[skey];

                if (skey == 'count' && val[skey] > 0) {
                    countOptions = countOptions + val[skey];
                    priceTotal = priceTotal + val['count'] * parseFloat(val['price'])
                }
            })
        });

        if (copy.draft.hasOwnProperty(item.id)) {
            itemCopy.countOptions = countOptions;
            itemCopy.priceTotal = priceTotal;

            let lastId = 0;
            if (Object.keys(copy.draft[item.id].items).length > 0) {
                lastId = Object.keys(copy.draft[item.id].items)[Object.keys(copy.draft[item.id].items).length - 1];
            }

            copy.draft[item.id].items[parseInt(lastId) + 1] = itemCopy
        } else {
            itemCopy.countOptions = countOptions;
            itemCopy.priceTotal = priceTotal;
            copy.draft[item.id] = { id: item.id, items: { '0': Object.assign({}, itemCopy) } };
        }
        if (copy.price.hasOwnProperty('total')) {
            copy.price.total = parseFloat(copy.price.total) + priceTotal
        } else { copy.price.total = priceTotal }



        return dispatch({
            type: 'add_item',
            payload: copy
        })
    }
}

export function changeItemAddition(item, idxName, itemAdditionIdx, operation = 'add') {
    return (dispatch, props) => {
        let { order } = props();

        let copy = Object.assign({}, order);
        let keys = Object.keys(copy.draft[item.id].items);
        let idx = keys[idxName];

        if (operation == 'add') {
            copy.draft[item.id].items[idx].options[itemAdditionIdx].count++;
            copy.draft[item.id].items[idx].countOptions++;
            copy.draft[item.id].items[idx].priceTotal = copy.draft[item.id].items[idx].priceTotal + parseFloat(copy.draft[item.id].items[idx].options[itemAdditionIdx].price)
            copy.price.total = parseFloat(copy.price.total) + parseFloat(copy.draft[item.id].items[idx].options[itemAdditionIdx].price)
        } else {
            if (copy.draft[item.id].items[idx].options[itemAdditionIdx].count > 0) {
                copy.draft[item.id].items[idx].options[itemAdditionIdx].count--;
                copy.draft[item.id].items[idx].countOptions--;
                copy.draft[item.id].items[idx].priceTotal = copy.draft[item.id].items[idx].priceTotal - parseFloat(copy.draft[item.id].items[idx].options[itemAdditionIdx].price)
                copy.price.total = parseFloat(copy.price.total) - parseFloat(copy.draft[item.id].items[idx].options[itemAdditionIdx].price)
            }
        }

        return dispatch({
            type: 'change_item_addition',
            payload: copy
        })
    }
}

export function cancelOrder(order_id, company_id) {

    return (dispatch, props) => {


        let request = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });

        return request.orders(order_id, 'PUT', { state: 'cancel' }).then(() => {

            dispatch({
                type: 'flush',
            })

            let order_company = store.get("order_company");
            order_company = order_company ? order_company : {};
            order_company[company_id] = false;
            store.save("order_company", order_company);

            dispatch({
                type: "companyOrderState",
                payload: { company_id: company_id, data: "no" }
            })
            routeService.changePage('menu');

        }).catch((error) => {

            Promise.reject(error);
        });



    }

}


export function makeOrder(body, company_id) {
    return (dispatch, props) => {

        let request = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });

        return request.orders(false, 'POST', body).then((response) => {
            if (response.hasOwnProperty('redirect')) {

                dispatch({
                    type: 'flush',
                })
                switch (response.status) {
                    case 409:
                        let errorMessages = [];
                        Object.keys(response.json).forEach(function (key) {
                            errorMessages.push(response.json[key].join("\r\n"));
                        });

                        let updatesTime = store.get("menuUpdate");
                        updatesTime = updatesTime ? updatesTime : {};
                        updatesTime[company_id] = 0;
                        store.save('menuUpdate', updatesTime);

                        dispatch({
                            type: 'show',
                            payload: {
                                title: I18n.t("dialog_warning_title"), message: errorMessages.join("\r\n"), callback: () => {
                                     routeService.changePage('companies');
                                }
                            }
                        })

                        break;
                    case 401:
                        routeService.changePage('init');
                        break;

                    case 302:

                        dispatch({
                            type: 'do_order',
                            payload: { 'order': response.json }
                        })

                        routeService.changePage('order');
                        
                        break;
                }

            } else {


                dispatch({
                    type: 'do_order',
                    payload: { 'order': response }
                })


                dispatch({
                    type: "companyOrderState",
                    payload: { company_id: company_id, data: "pending" }
                })


                let order_company = store.get("order_company");

                order_company = order_company ? order_company : {};

                order_company[company_id] = true;

                store.save("order_company", order_company);
                routeService.changePage('order');
            }

        }).catch((error) => {
           return Promise.reject(error);

        });
    }
}


export function getOrderForCompany(body) {
    return (dispatch, props) => {

        let request = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });

        return request.order(body, 'get', false, false).then((response) => {
            if (response.hasOwnProperty('redirect')) {

                dispatch({
                    type: 'flush',
                })
                switch (response.status) {
                    case 401:
                        routeService.changePage('init');
                        break;
                    case 404:

                        routeService.changePage('menu');
                        break;
                }
                return;
            }

            dispatch({
                type: 'do_order',
                payload: { state: response.state, order: response, desired_time: response.desired_time }
            })

        }).catch((error) => {
            Promise.reject(error)

        });
    }
}


