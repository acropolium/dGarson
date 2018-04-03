import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../services/translate.js'
import { Actions } from 'react-native-router-flux'
import { View, Text, Icon } from '../../BaseComponents'
import LeftSideStatus from './MicroElement/LeftSideStatus'
import styles from '../../../styles/components/order/StatusRedyStyle'

const StatusReady = props => {
    return (
        <View>
            <View style={styles.wrap}>
                <Text style={[styles.custom_font, styles.top_text]}>
                    {I18n.t('your_order_ready_part_1') + ' #' + props.orderId}{' '}
                    {I18n.t('ready_info_message')}:
                </Text>

                <Text
                    numberOfLines={2}
                    style={[styles.custom_font, styles.medium_text]}>
                    {props.getCurrentAddress()}
                </Text>
            </View>
            <View style={styles.wrap_botton_text}>
                <LeftSideStatus
                    name="clock_order_status"
                    text={I18n.t('take_away')}
                />

                <Text style={styles.botton_text}>
                    {props.getFormattedTime(props.desired_time)}
                </Text>
            </View>
        </View>
    )
}

StatusReady.propTypes = {
    getFormattedTime: PropTypes.func.isRequired,
    getCurrentAddress: PropTypes.func.isRequired
}

export default StatusReady
