import api from '../../services/apiService';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as routeService from "../../services/routeService";
import store from "../../utils/storage";

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

export function cancelOrder(order_id) {

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
            
            //this.props.spinnerActions.hide();
            routeService.changePage('menu');

        }).catch((error) => {

            Promise.reject(error);
        });



    }

}


export function makeOrder(body) {
    return (dispatch, props) => {

        let request = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });

        return request.orders(false, 'POST', body).then((response) => {
            if (response.hasOwnProperty('redirect')) {
                //!!!!!!!!!!!!!!!!!!!!!!this.resetOrder();
                dispatch({
                    type: 'flush',
                })
                switch (response.status) {
                    case 409:
                        /*  let errorMessages = [];
                          Object.keys(response.json).forEach(function (key) {
                              errorMessages.push(response.json[key].join("\r\n"));
                          });
  
                          this.props.spinnerActions.hide();
                          this.props.dialogActions.dialogShow({
                              title: I18n.t("dialog_warning_title"), message: errorMessages.join("\r\n"), callback: async () => {
                                  await userService.changePage('menu', { read_from_storage: true });
                              }
                          });*/
                        alert(409)
                        break;
                    case 401:
                        //   this.props.spinnerActions.hide();
                        // await userService.changePage('init', { read_from_storage: true });
                        alert(401)
                        break;
                    case 302:
                        /*orderService.set({ order: response.json });
                        await userService.set({ 'order': response.json });
                        this.props.spinnerActions.hide();
                        await userService.changePage('order');*/
                        alert(302)
                        break;
                }

            } else {


                dispatch({
                    type: 'do_order',
                    payload: { 'order': response }
                })
                //await userService.set({ 'order': response, company: userService.get('company') });
                //orderService.set({ order: response, company: userService.get('company') });

                // this.props.spinnerActions.hide();
                //routeService.changePage('order');
            }

        }).catch((error) => {
            //this.props.spinnerActions.hide();
            Promise.reject(error);

        });
    }
}


export function getOrderForCompany(body) {
    return (dispatch, props) => {

       // const { order } = props();


        let request = (new api()).setProps({
            user: {
                lang: store.get('lang'),
                token: store.get('token')
            }
        });



        return request.order(body, 'get', false, false).then((response) => {
            if (response.hasOwnProperty('redirect')) {

                /*let errorMessages = [];
                Object.keys(response.json).forEach(function (key) {
                    errorMessages.push(response.json[key].join("\r\n"));
                });*/

                /* if (reload_lister == false)
                     this.props.spinnerActions.hide();*/

                switch (response.status) {
                    case 401:
                        alert(401)
                        // await userService.changePage('init', { read_from_storage: true });
                        break;
                    case 404:
                        alert(404)
                        //await userService.changePage('menu');
                        break;
                }
                return;
            }




            dispatch({
                type: 'do_order',
                payload: { state: response.state, order: response, desired_time: response.desired_time }
            })

            /*
     if ((response.state == 'cancel' || response.state == 'payed')
         && orderService.get('order').state !== 'draft') {
       //  this.resetOrder();

         //await userService.changePage('menu');
     } else {

         await userService.set({ order: response });
         orderService.set({ state: response.state, order: response, desired_time: response.desired_time });
         this.setState({ dataSource: orderService.get('order').items });
     
     }*/

        }).catch((error) => {

            // if (reload_lister == false)
            //   this.props.spinnerActions.hide();
            Promise.reject(error)

        });
    }
}


