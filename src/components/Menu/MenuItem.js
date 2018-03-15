import React, { PropTypes, Component } from 'react'
import {
    TextInput,
    ListView,
    ListViewDataSource,
    TouchableNativeFeedback,
    StyleSheet,
    AsyncStorage,
    Platform,
} from 'react-native';

import { TouchableHighlight, Icon } from '../BaseComponents';
import I18n from '../../services/translate.js'
import OrderApi from '../../services/orderService';
import {
    FlatList,
    Image,
    View,
    Text
} from '../BaseComponents';
const orderService = new OrderApi();


import OrderItem from '../OrderItem';
import config from '../../config';
import styles from "../../styles/components/Menu/MenuItemStyle";


export default class MenuItem extends Component {
    constructor(props) {
        super(props);

        orderService.setProps(this.props);

        this.state = {
            dataSource: {},

        };

        let orderItems = [];

        if (this.props.order_draft.hasOwnProperty(this.props.item.id) && Object.keys(this.props.order_draft[this.props.item.id].items).length > 0) {
            orderItems = Object.values(this.props.order_draft[this.props.item.id].items);
        }

        this.state.dataSource = orderItems

    }

    getMenuItemsList = (items = []) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(items);
    };


    addItem = (item) => {
        this.props.addOrderItem(item)
    };

    componentWillReceiveProps(nextProps) {

        let orderItems = [];
        if (nextProps.order_draft.hasOwnProperty(nextProps.item.id) && Object.keys(nextProps.order_draft[nextProps.item.id].items).length > 0) {
            orderItems = Object.values(nextProps.order_draft[nextProps.item.id].items);
        }

        this.setState({ dataSource: orderItems });
    }

    getItemPrice() {
        return parseFloat(this.props.item.price) + this.props.item.options.reduce((sum, option) => { return sum + parseFloat(option.price) * option.count }, 0)
    }

    isSelected() {
        return this.props.order_draft.hasOwnProperty(this.props.item.id) && Object.values(this.props.order_draft[this.props.item.id].items).length > 0;
    }

    itemsCount() {
        let cnt = 0;
        if (this.props.order_draft.hasOwnProperty(this.props.item.id) && Object.values(this.props.order_draft[this.props.item.id].items).length > 0) {
            cnt = Object.values(this.props.order_draft[this.props.item.id].items).length;
        }

        return cnt;
    }

    render() {

        return (
            <View style={styles.card_block_wrap}>
                <TouchableHighlight underlayColor='#ddd' onPress={() => { this.addItem(this.props.item) }}>
                    <View style={[styles.card_block_main]} >
                        <View style={styles.wrap_direction}>
                            <View style={[styles.item_icon, {}]}>

                                {(this.props.item.logo == '' || this.props.item.logo == null) ?
                                    <Image source={require('../../media/elements/no_photo.png')} style={styles.img_size} /> :
                                    <Image
                                        defaultSource={require('../../media/elements/no_photo.png')}
                                        source={{ uri: this.props.item.logo }} style={styles.img_size} />
                                }
                            </View>
                            <View style={styles.wrap_text_block}>
                                <View style={styles.wrap_text}>
                                    <Text style={[styles.custom_font, styles.item_name, { color: this.isSelected() ? '#345e80' : '#2a2a31' }]}>{this.props.item.name}</Text>
                                    {this.isSelected() &&
                                        <Text style={[styles.custom_font, styles.item_name, { color: this.isSelected() ? '#345e80' : '#2a2a31' }]}> ({this.itemsCount()})</Text>
                                    }
                                </View>
                                <Text style={[styles.custom_font, styles.item_price, this.isSelected() ? styles.text_color : {}]}>{this.getItemPrice()} {I18n.t("uah")}</Text>
                            </View>
                        </View>
                        <View style={styles.item_icon_add}>
                            <Icon name='ios-add' size={30} iconFamily="Ionicons" />
                        </View>
                    </View>
                </TouchableHighlight>

                {<FlatList
                    data={this.state.dataSource}
                    renderItem={(orderItem, idx) => {

                        return <OrderItem changeOrderItemAddition={this.props.changeOrderItemAddition}
                            removeOrderItem={this.props.removeOrderItem} item={orderItem} root_item={this.props.item} root_item_idx={idx} />
                    }}
                />}

                {this.isSelected() &&
                    <View style={styles.selected_footer} />
                }

            </View>
        )
    }

}

