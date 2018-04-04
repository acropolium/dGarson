import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text, View, TouchableHighlight } from '../../../BaseComponents';
import styles from '../../../../styles/components/order/OrderFooter/OrderFooterPendingStyles';

const TochableOrderFooter = props => {
    return (
        <TouchableHighlight onPress={props.press}>
            <View style={[styles.preview_main]}>
                <Text style={[styles.custom_font, styles.text_style]}>
                    {props.text}
                </Text>
                <Icon name={props.iconName} />
            </View>
        </TouchableHighlight>
    );
};

TochableOrderFooter.propTypes = {
    press: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    iconFamily: PropTypes.string,
};

export default TochableOrderFooter;
