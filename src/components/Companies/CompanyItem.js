import React, { PropTypes, Component } from 'react'
import {
    StyleSheet,
    Platform,
    ImageBackground
} from 'react-native';

import { Icon, Image, View, TouchableHighlight } from '../BaseComponents';

import I18n from '../../services/translate.js'
import api from '../../services/apiService';
import OrderApi from '../../services/orderService';
import UserApi from '../../services/userService';
import config from '../../config';
import ItemInnerBlock from "./ItemInnerBlock";
import styles from "../../styles/components/companies/CompanyItemStyle";
import { Actions, ActionConst } from 'react-native-router-flux';

const orderService = new OrderApi();
const userService = new UserApi();

export default class CompanyItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // orderService.setProps(this.props);
        //userService.setProps(this.props);
    }

    getMenu = async (item) => {

        this.props.getCompanyMenu(item.id);
    };

    getOrderState() {
        if (this.props.item.hasOwnProperty('latest_order') && this.props.item.latest_order && (this.props.item.latest_order.state !== 'cancel' && this.props.item.latest_order.state !== 'payed')) {

            return this.props.item.latest_order.state;
        }
        return false;
    }

    renderInnerBlock = () => {

        return (
            <ItemInnerBlock item={this.props.item} orderState={this.getOrderState()} />
        );
    };


    render() {

        return (
            <View style={styles.card_block_wrap}>
                <TouchableHighlight underlayColor='#ddd' onPress={() => { this.getMenu(this.props.item) }}>
                    {this.getOrderState() == 'inprogress' ?
                        <ImageBackground source={require('../../media/elements/inprogress.gif')} style={[styles.card_block_main, styles.img_style]}>
                            {this.renderInnerBlock()}
                            <View style={styles.item_icon_add}>
                                <Icon name='ios-add' size={30} iconFamily="Ionicons" />
                            </View>
                        </ImageBackground>
                        :
                        <View style={[styles.card_block_main, { backgroundColor: this.getOrderState() == 'ready' ? '#dbc24f' : this.getOrderState() == 'notpicked' ? '#e65048' : 'transparent' }]} >
                            {this.renderInnerBlock()}
                            <View style={styles.item_icon_add}>
                                <Icon name='ios-arrow-round-forward' size={30} iconFamily="Ionicons" />
                            </View>
                        </View>
                    }
                </TouchableHighlight>

            </View>
        )
    }

}
