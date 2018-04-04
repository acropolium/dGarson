import React, { PropTypes, Component } from 'react'
import {
    TextInput,
    ListView,
    ListViewDataSource,
    TouchableNativeFeedback,
    StyleSheet,
    AsyncStorage,
    Platform
} from 'react-native'

import { TouchableHighlight, Icon } from '../BaseComponents'
import I18n from '../../services/translate.js'

import { FlatList, Image, View, Text } from '../BaseComponents'

import OrderItem from '../OrderItem'
import config from '../../config'
import styles from '../../styles/components/Menu/MenuItemStyle'

export default class MenuItem extends Component {
    constructor(props) {
        super(props)
    }

    addItem = item => {
        this.props.addOrderItem(item)
    }

    getItemPrice() {
        return (
            parseFloat(this.props.item.price) +
            this.props.item.options.reduce((sum, option) => {
                return sum + parseFloat(option.price) * option.count
            }, 0)
        )
    }

    isSelected() {
        return (
            this.props.order_draft.hasOwnProperty(this.props.item.id) &&
            Object.values(this.props.order_draft[this.props.item.id].items)
                .length > 0
        )
    }

    itemsCount() {
        let cnt = 0
        if (
            this.props.order_draft.hasOwnProperty(this.props.item.id) &&
            Object.values(this.props.order_draft[this.props.item.id].items)
                .length > 0
        ) {
            cnt = Object.values(
                this.props.order_draft[this.props.item.id].items
            ).length
        }
        return cnt
    }

    getItemList() {
        let isItem =
            this.props.order_draft.hasOwnProperty(this.props.item.id) &&
            Object.keys(this.props.order_draft[this.props.item.id].items)
                .length > 0

        return isItem
            ? Object.values(this.props.order_draft[this.props.item.id].items)
            : []
    }

    render() {
        return (
            <View style={styles.card_block_wrap}>
                <TouchableHighlight
                    underlayColor="#ddd"
                    onPress={() => {
                        this.addItem(this.props.item)
                    }}>
                    <View style={[styles.card_block_main]}>
                        <View style={styles.wrap_direction}>
                            <View style={[styles.item_icon, {}]}>
                                {this.props.item.logo == '' ||
                                    this.props.item.logo == null ? (
                                        <Image
                                            source={require('../../media/elements/no_photo.png')}
                                            style={styles.img_size}
                                        />
                                    ) : (
                                        <Image
                                            defaultSource={require('../../media/elements/no_photo.png')}
                                            source={{ uri: this.props.item.logo }}
                                            style={styles.img_size}
                                        />
                                    )}
                            </View>
                            <View style={styles.wrap_text_block}>
                                <View style={styles.wrap_text}>
                                    <Text
                                        style={[
                                            styles.custom_font,
                                            styles.item_name,
                                            {
                                                color: this.isSelected()
                                                    ? '#345e80'
                                                    : '#2a2a31'
                                            }
                                        ]}>
                                        {this.props.item.name}
                                    </Text>
                                    {this.isSelected() && (
                                        <Text
                                            style={[
                                                styles.custom_font,
                                                styles.item_name,
                                                {
                                                    color: this.isSelected()
                                                        ? '#345e80'
                                                        : '#2a2a31'
                                                }
                                            ]}>
                                            {' '}
                                            ({this.itemsCount()})
                                        </Text>
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.custom_font,
                                        styles.item_price,
                                        this.isSelected()
                                            ? styles.text_color
                                            : {}
                                    ]}>
                                    {this.getItemPrice()} {I18n.t(this.props.currency)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.item_icon_add}>
                            <Icon
                                name="add_menu_item_torder"
                            />
                        </View>
                    </View>
                </TouchableHighlight>

                {
                    <FlatList
                        data={this.getItemList()}
                        renderItem={(orderItem, idx) => {
                            return (
                                <OrderItem
                                    changeOrderItemAddition={
                                        this.props.changeOrderItemAddition
                                    }
                                    currency={this.props.currency}
                                    removeOrderItem={this.props.removeOrderItem}
                                    item={orderItem}
                                    root_item={this.props.item}
                                    root_item_idx={idx}
                                />
                            )
                        }}
                    />
                }

                {this.isSelected() && <View style={styles.selected_footer} />}
            </View>
        )
    }
}
