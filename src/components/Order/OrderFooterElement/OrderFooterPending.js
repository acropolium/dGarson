import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '../../BaseComponents';
import I18n from '../../../services/translate.js';
import TochableOrderFooter from './OrderFooterMicroElement/TochableOrderFooter';
import styles from '../../../styles/components/order/OrderFooter/OrderFooterPendingStyles';

const OrderFooterPending = props => {
    return (
        <TochableOrderFooter
            press={props.showCancelConfirm}
            iconName="send_cancel"
            text={I18n.t('order_' + props.orderState).toUpperCase()}
        />
    );
};
OrderFooterPending.propTypes = {
    showCancelConfirm: PropTypes.func.isRequired,
};

export default OrderFooterPending;
