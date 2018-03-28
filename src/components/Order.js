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


import api from '../services/apiService';
import I18n from '../services/translate.js'
import HeaderBlock from './HeaderBlock';


import { KeyboardWrapper, Text, View, Image } from './BaseComponents';
import styles from "../styles/components/OrderStyle";
import OrderList from "./Order/OrderList";
import OrderElement from "./Order/OrderListElement/OrderElement";
import OrderStatus from "./Order/OrderStatus";
import OrderFooter from "./Order/OrderFooter";

export default class Order extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.readOrder();
    };



    readOrder = () => {
        
        if (this.props.order.state != 'draft') {
            this.getOrder();
            
        }
    };


    makeOrder = async () => {

        let desired_time = this.props.order.desired_time;
        if (!desired_time) {
            desired_time = 15;
        }

        let body = {
            company_id: this.props.current_company_id,
            desired_time,
            items: this.props.order_item,
            location_id: this.props.currentLocation || false
        };

        this.props.orderActions.makeOrder(body, this.props.current_company_id).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
        });
    };

    getOrder = (reload_lister = false) => {

        this.props.orderActions.getOrderForCompany(this.props.current_company_id).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message })
        });

    };

    doCancel = () => {

        this.props.orderActions.cancelOrder(this.props.order_id, this.props.current_company_id).catch((error) => {
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


    goBack = () => {

        if (this.props.order_state == 'cancel' || this.props.order_state == 'payed') {
            this.props.orderActions.setOrder({}, "flush");
        }

        this.props.changePage('menu');
    };

    aboutAs = () => {

        this.props.changePage("about", false);
    }

    render() {

        let backButton = (['draft', 'cancel', 'payed'].indexOf(this.props.order_state) !== -1)
            ? this.goBack
            : false;

        return (
            <View style={styles.wrap}>
                <View>
                    <HeaderBlock currentLocation={this.props.currentLocation}
                        aboutAs={this.aboutAs}
                        company_info={this.props.company_info}
                        centerTitle={I18n.t("your_order") + (this.props.order_id ? (' #' + this.props.order_id) : '')}
                        backButton={backButton} />
                </View>

                <KeyboardWrapper style={styles.keyboard_wrapper}>
                    <OrderList data={this.props.order_item} renderItem={(item) => <OrderElement item={item} />} />
                </KeyboardWrapper>

                <OrderStatus currentLocation={this.props.currentLocation}
                    company_info={this.props.company_info}
                    order={this.props.order}
                    companyPhone={this.props.company_info.phone}
                    goBack={this.goBack} />

                <OrderFooter orderState={this.props.order_state}
                    showCancelConfirm={this.showCancelConfirm}
                    makeOrder={this.makeOrder}
                    orderCost={this.props.order_cost} />
            </View>
        )
    }
}

