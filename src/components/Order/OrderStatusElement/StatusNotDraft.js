import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../services/translate.js'
import { Actions } from 'react-native-router-flux'
import { Icon, View, Text, TouchableHighlight } from '../../BaseComponents'
import LeftSideStatus from './MicroElement/LeftSideStatus'
import styles from '../../../styles/components/order/StatusNotDraftStyle'

const StatusNotDraft = props => {
    return (
        <View style={styles.wrap}>
            <LeftSideStatus
                name="clock_order_status"
                text={I18n.t('take_away')}
            />
            <Text style={styles.text}>
                {props.getFormattedTime(props.desired_time || 15)}
            </Text>
        </View>
    )
}

StatusNotDraft.propTypes = {
    desired_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    getFormattedTime: PropTypes.func.isRequired
}

export default StatusNotDraft
