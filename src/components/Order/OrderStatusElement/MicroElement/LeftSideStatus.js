import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Icon} from '../../../BaseComponents';
import styles from "../../../../styles/components/order/LeftSideStatusStyle";

const LeftSideStatus = (props) => {
    return (

        <View style={[styles.timer_main]}>
            <Icon iconFamily={props.iconFamily} name={props.name} style={[styles.header_icons]} />
            <Text style={[styles.custom_font,styles.text]}>{props.text}</Text>
        </View>
    );
};

LeftSideStatus.propTypes = {
    iconFamily: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
};

export default LeftSideStatus;
