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

import * as routeService from "../services/routeService";

export default class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };


        //  routeService.changePage("menu");

       /* console.log("222222222222222222222222222222211111111111111111111333333")
        console.log(this.props)
        console.log("22222222222!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")*/

        this.orderPending = false;

        this.receiveProps = true;
    }

    componentDidMount() {
        this.readOrder();
    };

    componentWillReceiveProps(nextProps) {
      
      

      // this.setState({ dataSource: nextProps.order.order.items });
        /*if (this.receiveProps) {
            const { orderActions, order } = this.props;

            if (nextProps.order.hasOwnProperty('read_from_server') && nextProps.order.read_from_server === true) {

                orderActions.setOrder({ read_from_server: false });

                this.getOrder(true);
            }
        }*/

    }

    readOrder = () => {

       
        if (this.props.order.state == 'draft' && this.props.order.order.hasOwnProperty('items') && this.props.order.order.items.length > 0) {

          //  this.setState({ dataSource: this.props.order.order.items });

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

        //this.props.spinnerActions.show();


        let desired_time =this.props.order.desired_time;
        if (typeof desired_time === 'undefined') {
            desired_time = 15;
        }

        let body = {
            company_id: this.props.company_info.id,
            desired_time,
            items: this.props.order.order.items,
            location_id: this.props.currentLocation || false
        };

        this.props.orderActions.makeOrder(body).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
        });
};

    getOrder = (reload_lister = false) => {
       
        
        this.props.orderActions.getOrderForCompany(this.props.order.order.company_id).catch((error)=>{
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
        });
       
        // if (reload_lister == false)
         //   this.props.spinnerActions.show();

      /*  let request = (new api()).setProps(this.props);

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
*/

    };

    doCancel = () => {
      
      
         /*if (this.orderPending == true) {
            return;
        }*/
        this.props.order.order.id;
        this.orderPending = true;

        //this.props.spinnerActions.show();
        /*let request = (new api()).setProps(this.props);

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
            });*/

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

        if (this.props.order.order.state == 'cancel' || this.props.order.order.state == 'payed') {
            await this.orderActions.setOrder({}, "flush");
        }
        /*else {
            if (this.props.order.order.state == 'draft') {
                state = 'menu';
            }
        }
      /*  let data = false;
        if (this.props.order.order.stat == 'payed') {
            data = { read_from_storage: true };
        }*/

        // await userService.changePage(state, data);

        this.props.changePage(state);
    };

    aboutAs = () => {


        this.receiveProps = false;
        this.props.changePage("about", false);
    }

    render() {

        /* let backButton = (userService.getCompanyesCount() > 1
             || orderService.get('order').state == 'draft'
             || orderService.get('order').state == 'payed'
             || orderService.get('order').state == 'cancel')
             ? this.goBack
             : false;*/

        return (

            <View style={styles.wrap}>
                <View>
                    <HeaderBlock currentLocation={this.props.currentLocation} aboutAs={this.aboutAs} company_info={this.props.company_info} centerTitle={I18n.t("your_order") + (this.props.order.order.id ? (' #' + this.props.order.order.id) : '')} backButton={this.goBack} />
                </View>

                <KeyboardWrapper style={styles.keyboard_wrapper}>
                    <OrderList data={this.props.order.order.items} renderItem={(item) => <OrderElement item={item} />} />
                </KeyboardWrapper>

                <OrderStatus order={this.props.order} goBack={this.goBack} />

                <OrderFooter orderState={this.props.order.order.state} showCancelConfirm={this.showCancelConfirm} makeOrder={this.makeOrder} orderCost={this.props.order.order.cost} />
            </View>
        )
    }
}

