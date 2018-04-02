import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Text, View, TouchableHighlight } from '../BaseComponents'
import styles from '../../styles/components/OrderItemStyles'

const OrderItemOptions = props => {
    return (
        Object.values(props.options).length > 0 && (
            <TouchableHighlight underlayColor="#ddd" onPress={props.press}>
                <View style={styles.order_block_additions}>
                    <View style={styles.order_additions_element}>
                        <Text
                            style={[
                                styles.custom_font,
                                styles.order_block_additions_text
                            ]}>
                            {props.leftText}
                        </Text>
                        <Text
                            style={[
                                styles.custom_font,
                                styles.order_block_additions_text
                            ]}>
                            {' '}
                            {props.rightText}
                        </Text>
                    </View>
                    <View style={styles.item_icon_collapse}>
                        <Icon
                            name={props.iconName}
                            iconFamily={props.iconFamily}
                            size={25}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    )
}

OrderItemOptions.propTypes = {
    options: PropTypes.object.isRequired,
    press: PropTypes.func.isRequired,
    leftText: PropTypes.string.isRequired,
    rightText: PropTypes.number.isRequired,
    iconName: PropTypes.string.isRequired,
    iconFamily: PropTypes.string.isRequired
}

export default OrderItemOptions
