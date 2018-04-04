import React, { Component } from 'react'
import { ListView } from 'react-native'
import I18n from '../services/translate.js'
import OrderItemAddition from './OrderItemAddition'
import OrderItemOptions from './OrderItemComponents/OrderItemOptios'
import OrderItemElement from './OrderItemComponents/OrderItemElement'
import { View } from './BaseComponents'
import styles from '../styles/components/OrderItemStyles'

export default class OrderItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: false,
            idx: false,
            addition: false
        }
    }

    removeFromOrder = () => {
        const { item, idx, root_item_idx } = this.props

        this.props.removeOrderItem(item, root_item_idx)
    }

    render() {
        const { item, idx, root_item, root_item_idx } = this.props

        let orderItemAdditions = null

        if (
            Object.values(item.options).length > 0 &&
            this.state.addition != false
        ) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
            let dataSource = ds.cloneWithRows(Object.values(item.options))

            orderItemAdditions = (
                <ListView
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={(orderItemAddition, idx1, idx) => (
                        <OrderItemAddition
                            currency={this.props.currency}
                            changeOrderItemAddition={
                                this.props.changeOrderItemAddition
                            }
                            root_item={root_item}
                            root_item_idx={root_item_idx}
                            itemAddition={orderItemAddition}
                            idx={idx}
                        />
                    )}
                />
            )
        }
        return (
            <View style={styles.order_block_main}>
                <OrderItemElement
                    press={this.removeFromOrder}
                    leftText={
                        '#' + (parseInt(root_item_idx) + 1) + ' ' + item.name
                    }
                    rightText={
                        '- ' + item.priceTotal.toFixed(2) + ' ' + I18n.t(this.props.currency)
                    }
                    iconName="remove_from_order"
                />

                <OrderItemOptions
                    options={item.options}
                    press={() => {
                        this.setState({ addition: !this.state.addition })
                    }}
                    leftText={I18n.t('additions')}
                    rightText={item.countOptions}
                    iconName={
                        this.state.addition ? 'show_order_option' : 'hide_order_option'
                    }
                />

                {orderItemAdditions}
                <View style={styles.order_block_footer} />
            </View>
        )
    }
}
