import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import {FlatList, KeyboardWrapper, Icon, Text, View, TouchableHighlight} from "../BaseComponents";
import MenuItem from './MenuItem';
import config from '../../config';
import I18n from '../../services/translate.js'
import OrderApi from '../../services/orderService';
import UserApi from '../../services/userService';
import  styles from "../../styles/components/Menu/RenderMenuFooterStyle";

const userService = new UserApi();
const orderService = new OrderApi();

export default class RenderMenuFooter extends Component {
    constructor(props){
        super(props);
        userService.setProps(props);
        orderService.setProps(props);
    };

    previewOrder = async () => {
        if (!orderService.get('price').hasOwnProperty('total') || (orderService.get('price').hasOwnProperty('total') && orderService.get('price').total==0)){
            return
        }

        let items = [];
        Object.keys(orderService.get('draft')).map((objectKey, index) => {
            let value = orderService.get('draft')[objectKey];
            Object.values(value.items).map((item, idx) => {
                item.index = idx;
                items.push(item)
            })
        });

        let orderData = {
            company_id: userService.get('company'),
            state: 'draft',
            items: items,
            cost: orderService.get('price').total
        };

        await userService.set({order: orderData, company: userService.get('company')});
        orderService.set({order: orderData, state:'draft'});

        await userService.changePage('previewOrder', false, false);
    };

    render() {
        return (
            <View style={styles.footer_main}>
                    <View style={styles.total_block}>
                        <Text style={styles.total_color}>{I18n.t("total")}: </Text>
                        <Text style={styles.total_color}>{orderService.get('price').total.toFixed(2)} {I18n.t("uah")}</Text>
                    </View>

                    {orderService.get('price').hasOwnProperty('total') && orderService.get('price').total > 0 &&
                    <TouchableHighlight onPress={this.previewOrder}>
                        <View style={[styles.preview_main]}>
                            <Text
                                style={styles.custom_font}>{I18n.t("preview_order").toUpperCase()}</Text>
                            <Icon name='ios-arrow-round-forward'
                                  style={styles.previewOrderIcon}/>
                        </View>
                    </TouchableHighlight>
                    }
            </View>
        );
  }
}


