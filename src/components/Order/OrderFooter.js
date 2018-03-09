import React from 'react';
import PropTypes from 'prop-types';
import OrderFooterInprogress from './OrderFooterElement/OrderFooterInprogress';
import OrderFooterWrap from './OrderFooterElement/OrderFooterWrap';

export default class OrderFooter extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return this.props.orderState == 'inprogress' ?
            <OrderFooterInprogress orderState={this.props.orderState} orderCost={this.props.orderCost}  />
            :
            <OrderFooterWrap orderState={this.props.orderState} makeOrder={this.props.makeOrder}
                showCancelConfirm={this.props.showCancelConfirm} orderCost={this.props.orderCost}  />
    }
};


OrderFooter.propTypes = {
    orderState: PropTypes.string.isRequired,
    orderCost: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    showCancelConfirm: PropTypes.func.isRequired,
    makeOrder: PropTypes.func.isRequired,
};



