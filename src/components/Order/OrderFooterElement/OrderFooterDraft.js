import React from 'react'
import PropTypes from 'prop-types'
import TochableOrderFooter from './OrderFooterMicroElement/TochableOrderFooter'
import I18n from '../../../services/translate.js'
import styles from '../../../styles/components/order/OrderFooter/OrderFooterDraftStyles'

const OrderFooterDraft = props => {
    return (
        <TochableOrderFooter
            press={props.makeOrder}
            iconName="ios-arrow-round-forward"
            text={I18n.t('order').toUpperCase()}
        />
    )
}

OrderFooterDraft.propTypes = {
    makeOrder: PropTypes.func.isRequired
}

export default OrderFooterDraft
