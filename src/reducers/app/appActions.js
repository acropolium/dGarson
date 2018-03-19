import api from '../../services/apiService';

import store from "../../utils/storage";
import * as routeService from "../../services/routeService";


export function notificationHandler(notification) {
    // alert(JSON.stringify(notification))
    // alert("ssssssssssssssssssssssssssssssssssssss")
    return (dispatch, props) => {
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

        if (data.hasOwnProperty('state')) {
            /* if (userService.get('token') == false) {
 
                 let page = store.get('state');
                 routeService.changePage(page ? page : 'init');
             }*/

            let { order } = props();


            if (order.order.id == data.id) {

                let data_set = { ...order.order, state: data.state };

               
                dispatch({
                    type: 'do_order',
                    payload: data_set
                })
            }

            /*   let companies = userService.get('companies');
               let textMessage = '';
               if (companies.hasOwnProperty(data.company_id)) {
                   textMessage += companies[data.company_id].name + "\r\n";
               }
               switch (data.state) {
                   case 'ready':
                       textMessage += I18n.t('your_order_ready_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_ready_part_2');
                       dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(219, 194, 78, 0.8)' }, image: 'icon_ready' });
                       break;
                   case 'payed':
                       textMessage += I18n.t('your_order_payed_part_1') + ' #' + data.id + ' ' + I18n.t('your_order_payed_part_2');
                       dialogShow({ message: textMessage, overlayStyle: { backgroundColor: 'rgba(131, 187, 112, 0.8)' }, image: 'icon_payed' });
                       break;
               }
             
             /*  if (companies.hasOwnProperty(data.company_id)) {
                   companies[data.company_id].orders = [{ id: data.id, state: data.state }]
               }*/
            // userService.set({ companies: companies, read_from_storage: true });

            /* if (orderService.get('order').id == data.id && userService.get('state') != 'order') {
                 //changePage({state: 'order'})
             }
         }*/
        }
    }
}