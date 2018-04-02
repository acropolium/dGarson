import React from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, Dimensions } from 'react-native'
import { Text, View } from '../../BaseComponents'
import styles from '../../../styles/components/order/OrderFooterInprogressStyle'
import I18n from '../../../services/translate.js'
let windowWidth = Dimensions.get('window').width

const OrderFooterInprogress = props => {
    return (
        <ImageBackground
            source={require('../../../media/elements/inprogress.gif')}
            style={styles.background}>
            <View
                style={[
                    styles.footer_main,
                    { backgroundColor: 'transparent' }
                ]}>
                <View style={styles.total_block}>
                    <Text style={[styles.total_color]}>
                        {I18n.t('total')}:{' '}
                    </Text>
                    <Text style={[styles.total_color]}>
                        {parseFloat(props.orderCost).toFixed(2)} {I18n.t('uah')}
                    </Text>
                </View>
                <View>
                    <View style={[styles.preview_main]}>
                        <Text style={[styles.custom_font, styles.text]}>
                            {I18n.t('order_' + props.orderState).toUpperCase()}
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

OrderFooterInprogress.propTypes = {
    orderState: PropTypes.string.isRequired,
    orderCost: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ])
}

export default OrderFooterInprogress
