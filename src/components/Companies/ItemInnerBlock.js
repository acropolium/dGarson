import React from 'react'
import { StyleSheet } from 'react-native'
import i18n from '../../services/translate'
import { Text, View, Image } from '../BaseComponents'
import config from '../../config'
import styles from '../../styles/components/companies/ItemInnerBlockStyle'
import {
    ORDER_INPROGRESS
} from '../../reducers/constOrderState.js'

const ItemInnerBlock = props => {
    let curImage = props.item.logo
        ? { uri: props.item.logo }
        : require('../../media/elements/no_photo_company.png')

    return (
        <View style={styles.container}>
            <View style={styles.item_icon}>
                <Image source={curImage} style={styles.item_image} />
            </View>
            <View style={styles.wrap_text_block}>
                <View style={styles.wrap_text}>
                    <Text
                        style={[
                            styles.custom_font,
                            styles.item_name,
                            {
                                color:
                                    props.orderState == ORDER_INPROGRESS
                                        ? '#fff'
                                        : '#2a2a31'
                            }
                        ]}>
                        {props.item.name}
                    </Text>
                </View>
                {props.orderState && (
                    <Text style={[styles.custom_font, styles.item_price]}>
                        {i18n.t('order_' + props.orderState).toUpperCase()}
                    </Text>
                )}
            </View>
        </View>
    )
}

export default ItemInnerBlock
