import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../services/translate.js'
import { Actions } from 'react-native-router-flux';
import { Text, View, Icon, TouchableHighlight } from '../../BaseComponents';
import LeftSideStatus from './MicroElement/LeftSideStatus';
import styles from "../../../styles/components/order/OrderStatusStyle";

const StatusDraft = (props) => {
    return (

        <View style={styles.wrap_status_draft}>

            <LeftSideStatus iconFamily="EvilIcons" name='ios-clock' text={I18n.t('take_away')} />

            <TouchableHighlight onPress={() => Actions.timer()}>
                <View style={styles.wrap_block_status_draft}>
                    <Text style={[styles.custom_font, styles.selectTextStyle, styles.text_size]}>{props.getFormattedTime(props.desired_time || 15)}</Text>
                    <Icon name='ios-arrow-down' iconFamily="Ionicons" style={styles.icon_draft} />
                </View>
            </TouchableHighlight>
        </View>
    );
};

StatusDraft.propTypes = {
    desired_time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    getFormattedTime: PropTypes.func.isRequired
};

export default StatusDraft;
