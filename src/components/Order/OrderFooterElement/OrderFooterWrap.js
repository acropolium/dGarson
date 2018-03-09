import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Icon } from '../../BaseComponents';
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
        'draft':(orderState)=> <OrderFooterDraft orderState={orderState} makeOrder={this.props.makeOrder} />,
        'notpicked': (orderState)=><OrderFooterNotpicked orderState={orderState} />,
        'ready': (orderState)=><OrderFooterReady orderState={orderState} />,
        'payed': (orderState)=><OrderFooterPayed orderState={orderState} />,
        'cancel':(orderState)=> <OrderFooterCancel orderState={orderState} />,
        'pending': (orderState)=><OrderFooterPending orderState={orderState} showCancelConfirm={this.props.showCancelConfirm} />,
        'recieved':(orderState)=><OrderFooterRecived orderState={orderState} showCancelConfirm={this.props.showCancelConfirm} />,
    };

    getFooterElement = (orderState) => {
        
        return this.renderElements[orderState] ? this.renderElements[orderState](orderState) : this.renderElements['draft'];
    }

    render() {


        return (

            < View style={[styles.footer_main, { backgroundColor: this.props.orderState == 'cancel' ? '#a2a3a8' : this.props.orderState == 'inprogress' ? '#2a2a32' : this.props.orderState == 'payed' ? '#89BC77' : this.props.orderState == 'ready' ? '#dbc24f' : this.props.orderState == 'notpicked' ? '#e65048' : '#2a2a31' }]} >
                <View style={styles.total_block}>
                    <Text style={[styles.total_color, this.props.orderState == 'payed' || this.props.orderState == 'cancel' || this.props.orderState == 'inprogress' || this.props.orderState == 'notpicked' ? { color: 'black' } : {}]}>{I18n.t("total")}: </Text>
                    <Text style={[styles.total_color, this.props.orderState == 'payed' || this.props.orderState == 'cancel' || this.props.orderState == 'inprogress' || this.props.orderState == 'notpicked' ? { color: 'black' } : {}]}>{parseFloat(this.props.orderCost).toFixed(2)} {I18n.t("uah")}</Text>
                </View>
                <View>
                    {this.getFooterElement(this.props.orderState)}
                </View>
            </View >
        );
    }
}

OrderFooterWrap.propTypes = {
    orderState: PropTypes.string.isRequired,
    orderCost: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    showCancelConfirm: PropTypes.func.isRequired,
    makeOrder: PropTypes.func.isRequired,
};
