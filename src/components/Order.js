import React, { PropTypes, Component } from 'react'
import {
    TextInput,
    ListView,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
    BackAndroid,
    Linking,
    Picker,
    Dimensions,
    RefreshControl,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import Button from '../widgets/buttons/styledButton';
import config from '../config';
import api from '../services/apiService';
import I18n from '../services/translate.js'
import HeaderBlock from './HeaderBlock';
import UserApi from '../services/userService';
import OrderApi from '../services/orderService';
import { KeyboardWrapper, Text, View, Image } from './BaseComponents';
import styles from "../styles/components/OrderStyle";
import OrderList from "./Order/OrderList";
import OrderElement from "./Order/OrderListElement/OrderElement";
import OrderStatus from "./Order/OrderStatus";
import OrderFooter from "./Order/OrderFooter";

const userService = new UserApi();
const orderService = new OrderApi();

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };

        orderService.setProps(this.props);
        userService.setProps(this.props);

        this.orderPending = false;

        this.receiveProps = true;
    }

    componentDidMount() {
        this.readOrder();
    };

    componentWillReceiveProps(nextProps) {
        if (this.receiveProps) {
            const { orderActions, order } = this.props;

            if (nextProps.order.hasOwnProperty('read_from_server') && nextProps.order.read_from_server === true) {

                orderActions.setOrder({ read_from_server: false });

                this.getOrder(true);
            }
        }

    }

    readOrder = () => {
        if (orderService.get('order').state == 'draft' && orderService.get('order').hasOwnProperty('items') && orderService.get('order').items.length > 0) {

            this.setState({ dataSource: orderService.get('order').items });

        } else {
            this.getOrder();
        }
    };

    resetOrder = async (state = 'cancel') => {
        await orderService.resetOrder(state);
    };

    makeOrder = async () => {

        if (this.orderPending == true) {
            return;
        }

        this.orderPending = true;

        this.props.spinnerActions.show();


        let desired_time = orderService.get('desired_time');
        if (typeof desired_time === 'undefined') {
            desired_time = 15;
        }

        let body = {
            company_id: userService.get('company_info').id,
            desired_time,
            items: orderService.get('order').items,
            location_id: userService.get('location') || false
        };


        let request = (new api()).setProps(this.props);

        request.orders(false, 'POST', body,
            () => { this.orderPending = false; },
            async (response) => {
                if (response.hasOwnProperty('redirect')) {
                    this.resetOrder();
                    switch (response.status) {
                        case 409:
                            let errorMessages = [];
                            Object.keys(response.json).forEach(function (key) {
                                errorMessages.push(response.json[key].join("\r\n"));
                            });

                            this.props.spinnerActions.hide();
                            this.props.dialogActions.dialogShow({
                                title: I18n.t("dialog_warning_title"), message: errorMessages.join("\r\n"), callback: async () => {
                                    await userService.changePage('menu', { read_from_storage: true });
                                }
                            });

                            break;
                        case 401:
                            this.props.spinnerActions.hide();
                            await userService.changePage('init', { read_from_storage: true });
                            break;
                        case 302:
                            orderService.set({ order: response.json });
                            await userService.set({ 'order': response.json });
                            this.props.spinnerActions.hide();
                            await userService.changePage('order');
                            break;
                    }

                } else {
                    await userService.set({ 'order': response, company: userService.get('company') });
                    orderService.set({ order: response, company: userService.get('company') });

                    this.props.spinnerActions.hide();
                    await userService.changePage('order');
                }

            },
            (error) => {
                this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
            });
    };

    getOrder = (reload_lister = false) => {
        if (reload_lister == false)
            this.props.spinnerActions.show();

        let request = (new api()).setProps(this.props);

        request.order(userService.get('company_info').id, 'get', false,
            false,
            async (response) => {
                if (response.hasOwnProperty('redirect')) {

                    let errorMessages = [];
                    Object.keys(response.json).forEach(function (key) {
                        errorMessages.push(response.json[key].join("\r\n"));
                    });

                    if (reload_lister == false)
                        this.props.spinnerActions.hide();

                    switch (response.status) {
                        case 401:
                            await userService.changePage('init', { read_from_storage: true });
                            break;
                        case 404:
                            await userService.changePage('menu');
                            break;
                    }
                    return;
                }

                if (reload_lister == false) {
                    this.props.spinnerActions.hide();
                }

                if ((response.state == 'cancel' || response.state == 'payed')
                    && orderService.get('order').state !== 'draft') {
                    this.resetOrder();

                    await userService.changePage('menu');
                } else {
                    await userService.set({ order: response });
                    orderService.set({ state: response.state, order: response, desired_time: response.desired_time });
                    this.setState({ dataSource: orderService.get('order').items });
                }
            },
            (error) => {
                if (reload_lister == false)
                    this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
            });


    };

    doCancel = () => {
        if (this.orderPending == true) {
            return;
        }

        this.orderPending = true;

        this.props.spinnerActions.show();
        let request = (new api()).setProps(this.props);

        request.orders(orderService.get('order').id, 'PUT', { state: 'cancel' },
            () => { this.orderPending = false; },
            async () => {

                this.resetOrder('cancel');
                this.props.spinnerActions.hide();
                await userService.changePage('menu', { read_from_storage: true });

            },
            (error) => {
                this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
            });

    };

    showCancelConfirm = () => {
        this.props.dialogActions.dialogShow({
            type: 'confirm',
            title: I18n.t("order_cancel_title"),
            message: I18n.t("order_cancel_message"),
            callback: this.doCancel,
            ok_backgroundColor: '#e65048'
        });

    };


    goBack = async () => {
        let state = 'menu';

        if (orderService.get('order').state == 'cancel' || orderService.get('order').state == 'payed') {
            await orderService.resetOrder(orderService.get('order').state)
        } else {
            if (userService.getCompanyesCount() > 1) {
                state = 'companies';
            }

            if (orderService.get('order').state == 'draft') {
                state = 'menu';
            }
        }
        let data = false;
        if (orderService.get('order').state == 'payed') {
            data = { read_from_storage: true };
        }

        await userService.changePage(state, data);
    };

    aboutAs = () => {


        this.receiveProps = false;
        userService.changePage("about", false, false);
    }

    render() {

        let backButton = (userService.getCompanyesCount() > 1
            || orderService.get('order').state == 'draft'
            || orderService.get('order').state == 'payed'
            || orderService.get('order').state == 'cancel')
            ? this.goBack
            : false;

        return (

            <View style={styles.wrap}>
                <View>
                    <HeaderBlock aboutAs={this.aboutAs} {...this.props} centerTitle={I18n.t("your_order") + (orderService.get('order').id ? (' #' + orderService.get('order').id) : '')} backButton={backButton} />
                </View>

                <KeyboardWrapper style={styles.keyboard_wrapper}>
                    <OrderList data={this.state.dataSource} renderItem={(item) => <OrderElement item={item} />} />
                </KeyboardWrapper>

                <OrderStatus {...this.props} goBack={this.goBack} userService={userService} orderService={orderService} orderState={orderService.get('order').state} />

                <OrderFooter orderState={orderService.get('order').state} showCancelConfirm={this.showCancelConfirm} makeOrder={this.makeOrder} orderCost={orderService.get('order').cost} />
            </View>
        )
    }
}

