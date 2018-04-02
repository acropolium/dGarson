import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../services/translate.js'
import TochableOrderFooter from './OrderFooterMicroElement/TochableOrderFooter'
import styles from '../../../styles/components/order/OrderFooter/OrderFooterRecivedStyles'

const OrderFooterRecived = props => {
    return (
        <TochableOrderFooter
            press={props.showCancelConfirm}
            iconName="ios-close"
            text={I18n.t('order_' + props.orderState).toUpperCase()}
        />
    )
}

OrderFooterRecived.propTypes = {
    showCancelConfirm: PropTypes.func.isRequired
}
export default OrderFooterRecived
