import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from '../../BaseComponents';

import I18n from '../../../services/translate.js';
import styles from "../../../styles/components/order/OrderFooter/OrderFooterStyles";


const OrderFooterCancel = (props) => {
    
    return (
        <View style={[styles.preview_main]}>
            <Text style={[styles.custom_font, styles.text_style]}>{I18n.t("order_" + props.orderState).toUpperCase()}</Text>
        </View>
    );
};



export default OrderFooterCancel;
