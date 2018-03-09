import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../services/translate.js'
import { Actions } from 'react-native-router-flux';
import {Icon, View, Text, TouchableHighlight} from '../../BaseComponents';
import LeftSideStatus from './MicroElement/LeftSideStatus';
import styles from "../../../styles/components/order/StatusNotDraftStyle";

const StatusNotDraft = (props) => {
    return (

        <View style={styles.wrap}>
        
            <LeftSideStatus  iconFamily="EvilIcons" name='ios-clock-outline' text={I18n.t('take_away')} />
            <Text style={styles.text}>{props.getFormattedTime(props.orderService.get('desired_time') || 15)}</Text>
        </View>
    );
};

StatusNotDraft.propTypes = {
    orderService: PropTypes.object.isRequired,
    getFormattedTime: PropTypes.func.isRequired
};

export default StatusNotDraft;
