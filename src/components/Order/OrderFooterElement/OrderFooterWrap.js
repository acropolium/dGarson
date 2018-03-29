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
import styles from "../../../styles/components/OrderStyle";

export default class OrderFooterWrap extends React.Component {

    constructor(props) {
        super(props);
    };

    renderElements = {
        'draft': (orderState) => <OrderFooterDraft orderState={orderState} makeOrder={this.props.makeOrder} />,
        'notpicked': (orderState) => <OrderFooterNotpicked orderState={orderState} />,
        'ready': (orderState) => <OrderFooterReady orderState={orderState} />,
        'payed': (orderState) => <OrderFooterPayed orderState={orderState} />,
        'cancel': (orderState) => <OrderFooterCancel orderState={orderState} />,
        'pending': (orderState) => <OrderFooterPending orderState={orderState} showCancelConfirm={this.props.showCancelConfirm} />,
        'recieved': (orderState) => <OrderFooterRecived orderState={orderState} showCancelConfirm={this.props.showCancelConfirm} />,
    };

    getFooterElement = (orderState) => {

        return this.renderElements[orderState] ? this.renderElements[orderState](orderState) : this.renderElements['draft'];
    }

    getColorForOrderStateText() {
        let orderStates = ['payed', 'cancel', 'notpicked'];
        return orderStates.indexOf(this.props.orderState) != -1 ? { color: 'black' } : {};
    }

    getColorForOrderBackground() {
        let color;
        switch (this.props.orderState) {
            case 'cancel':
                color = '#a2a3a8';
                break;
            case 'payed':
                color = '#89BC77';
                break;
            case 'ready':
                color = '#dbc24f';
                break;
            case 'notpicked':
                color = '#e65048';
                break;
            default:
                color = '#2a2a31';
        }
        return color;
    }


    render() {

        return (

            < View style={[styles.footer_main, { backgroundColor: this.getColorForOrderBackground() }]} >
                <View style={styles.total_block}>
                    <Text style={[styles.total_color, this.getColorForOrderStateText()]}>{I18n.t("total")}: </Text>
                    <Text style={[styles.total_color, this.getColorForOrderStateText()]}>{parseFloat(this.props.orderCost).toFixed(2)} {I18n.t("uah")}</Text>
                </View>
                <View>
                    {this.props.orderState && this.getFooterElement(this.props.orderState)}
                </View>
            </View >
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
