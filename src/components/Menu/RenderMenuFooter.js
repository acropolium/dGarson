import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import { FlatList, KeyboardWrapper, Icon, Text, View, TouchableHighlight } from "../BaseComponents";
import MenuItem from './MenuItem';
import config from '../../config';
import I18n from '../../services/translate.js'
import OrderApi from '../../services/orderService';
import UserApi from '../../services/userService';
import styles from "../../styles/components/Menu/RenderMenuFooterStyle";

const userService = new UserApi();
const orderService = new OrderApi();

export default class RenderMenuFooter extends Component {
    constructor(props) {
        super(props);

    };

    previewOrder = async () => {
        if ((this.props.total_price.hasOwnProperty('total') && this.props.total_price.total == 0)) {
            return
        }

        let items = [];
        Object.keys(this.props.order_draft).map((objectKey, index) => {
            let value = this.props.order_draft[objectKey];
            Object.values(value.items).map((item, idx) => {
                item.index = idx;
                items.push(item)
            })
        });

        let orderData = {
            company_id: this.props.company_id,
            state: 'draft',
            items: items,
            cost: this.props.total_price.total
        };

        // await userService.set({order: orderData, company: userService.get('company')});
        this.props.setOrder({ order: orderData, state: 'draft' });

        this.props.changePage('previewOrder', false);
    };

    render() {
        return (
            <View style={styles.footer_main}>
                <View style={styles.total_block}>
                    <Text style={styles.total_color}>{I18n.t("total")}: </Text>
                    <Text style={styles.total_color}>{this.props.total_price.total.toFixed(2)} {I18n.t("uah")}</Text>
                </View>

                {this.props.total_price.hasOwnProperty('total') && this.props.total_price.total > 0 &&
                    <TouchableHighlight onPress={this.previewOrder}>
                        <View style={[styles.preview_main]}>
                            <Text
                                style={styles.custom_font}>{I18n.t("preview_order").toUpperCase()}</Text>
                            <Icon name='ios-arrow-round-forward'
                                style={styles.previewOrderIcon} />
                        </View>
                    </TouchableHighlight>
                }
            </View>
        );
    }
}


