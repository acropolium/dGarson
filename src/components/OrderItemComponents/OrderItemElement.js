import React from 'react'
import PropTypes from 'prop-types'
import { Icon, View, Text, TouchableHighlight } from '../BaseComponents'
import styles from '../../styles/components/OrderItemStyles'

const OrderItemElement = props => {
    return (
        <View style={styles.order_block_element_wrap}>
            <View style={styles.order_block_element}>
                <Text
                    style={[
                        styles.custom_font,
                        styles.order_block_element_name
                    ]}>
                    {props.leftText}
                </Text>
                <Text
                    style={[
                        styles.custom_font,
                        styles.order_block_element_price
                    ]}>
                    {' '}
                    {props.rightText}
                </Text>
            </View>
            <TouchableHighlight underlayColor="#ddd" onPress={props.press}>
                <View style={styles.item_icon_remove}>
                    <Icon
                        name={props.iconName}
                        size={25}
                        iconFamily={props.iconFamily}
                    />
                </View>
            </TouchableHighlight>
        </View>
    )
}

OrderItemElement.propTypes = {
    press: PropTypes.func.isRequired,
    leftText: PropTypes.string.isRequired,
    rightText: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
}

export default OrderItemElement
