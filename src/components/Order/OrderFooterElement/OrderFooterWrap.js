import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '../../BaseComponents';
import OrderFooterDraft from './OrderFooterDraft';
import OrderFooterPending from './OrderFooterPending';
import OrderFooterRecived from './OrderFooterRecived';
import OrderFooterReady from './OrderFooterReady';
import OrderFooterNotpicked from './OrderFooterNotpicked';
import OrderFooterPayed from './OrderFooterPayed';
import OrderFooterCancel from './OrderFooterCancel';
import I18n from '../../../services/translate.js';
import styles from '../../../styles/components/OrderStyle';
import {
    ORDER_PAYED,
    ORDER_DRAFT,
    ORDER_CANCEL,
    ORDER_NOTPICKED,
    ORDER_READY,
    ORDER_PENDING,
    ORDER_RECIEVED,
} from '../../../reducers/constOrderState.js';

export default class OrderFooterWrap extends React.Component {
    constructor(props) {
        super(props);
    }

    renderElements = {
        [ORDER_DRAFT]: orderState => (
            <OrderFooterDraft
                orderState={orderState}
                makeOrder={this.props.makeOrder}
            />
        ),
        [ORDER_NOTPICKED]: orderState => (
            <OrderFooterNotpicked orderState={orderState} />
        ),
        [ORDER_READY]: orderState => (
            <OrderFooterReady orderState={orderState} />
        ),
        [ORDER_PAYED]: orderState => (
            <OrderFooterPayed orderState={orderState} />
        ),
        [ORDER_CANCEL]: orderState => (
            <OrderFooterCancel orderState={orderState} />
        ),
        [ORDER_PENDING]: orderState => (
            <OrderFooterPending
                orderState={orderState}
                showCancelConfirm={this.props.showCancelConfirm}
            />
        ),
        [ORDER_RECIEVED]: orderState => (
            <OrderFooterRecived
                orderState={orderState}
                showCancelConfirm={this.props.showCancelConfirm}
            />
        ),
    };

    getFooterElement = orderState => {
        return this.renderElements[orderState]
            ? this.renderElements[orderState](orderState)
            : this.renderElements[ORDER_DRAFT];
    };

    getColorForOrderStateText() {
        let orderStates = [ORDER_PAYED, ORDER_CANCEL, ORDER_NOTPICKED];
        return orderStates.indexOf(this.props.orderState) != -1
            ? { color: 'black' }
            : {};
    }

    getColorForOrderBackground() {
        let color;
        switch (this.props.orderState) {
            case ORDER_CANCEL:
                color = '#a2a3a8';
                break;
            case ORDER_PAYED:
                color = '#89BC77';
                break;
            case ORDER_READY:
                color = '#dbc24f';
                break;
            case ORDER_NOTPICKED:
                color = '#e65048';
                break;
            default:
                color = '#2a2a31';
        }
        return color;
    }

    render() {
        return (
            <View
                style={[
                    styles.footer_main,
                    { backgroundColor: this.getColorForOrderBackground() },
                ]}>
                <View style={styles.total_block}>
                    <Text
                        style={[
                            styles.total_color,
                            this.getColorForOrderStateText(),
                        ]}>
                        {I18n.t('total')}:{' '}
                    </Text>
                    <Text
                        style={[
                            styles.total_color,
                            this.getColorForOrderStateText(),
                        ]}>
                        {parseFloat(this.props.orderCost).toFixed(2)}{' '}
                        {I18n.t(this.props.currency)}
                    </Text>
                </View>
                <View>
                    {this.props.orderState &&
                        this.getFooterElement(this.props.orderState)}
                </View>
            </View>
        );
    }
}

OrderFooterWrap.propTypes = {
    orderCost: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    showCancelConfirm: PropTypes.func.isRequired,
    makeOrder: PropTypes.func.isRequired,
};
