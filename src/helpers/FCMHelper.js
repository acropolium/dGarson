import FCM from 'react-native-fcm';
import { Platform } from 'react-native';
import api from "../services/apiService";
import I18n from '../services/translate';
import * as userActions from '../reducers/user/userActions'

export default {
    getToken: () => {
        return FCM.getFCMToken().then(token => {
            return Promise.resolve(token);
        }).catch(err => {
            return Promise.resolve(false);
        });
    },
    sendToken: (token, userService, context) => {
        if (token) {
            let device_token = userService.get('device_token');
            if (device_token !== token) {
                if (token !== false) {
                    userService.set({ device_token_send: 0 });
                    let request = (new api()).setProps(context.props);
                    request.device_token('PUT', { device_token: token, platform: Platform.OS }, false,
                        () => {
                            userService.set({ device_token: token, device_token_send: 1 })
                        }
                    );
                }
            }
        }
    },
    notificationHandler: async (notification, orderService, userService, dialogShow) => {
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
            if (userService.get('token') == false) {
            
                await userService.loadInitialState();
                await orderService.loadInitialState();
                await userService.changePage(userService.get('state', 'init'));
            }
            if (orderService.get('order').id == data.id) {
                let data_set = { state: data.state, order: { ...orderService.get('order'), state: data.state } };
                orderService.setOrder(data_set);
            }
            let companies = userService.get('companies');
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
            if (companies.hasOwnProperty(data.company_id)) {
                companies[data.company_id].orders = [{ id: data.id, state: data.state }]
            }
            userService.set({ companies: companies, read_from_storage: true });

            if (orderService.get('order').id == data.id && userService.get('state') != 'order') {
                //changePage({state: 'order'})
            }
        }
    }

};