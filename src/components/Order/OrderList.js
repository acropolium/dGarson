import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from '../BaseComponents'
import styles from '../../styles/components/OrderStyle'

const OrderList = props => {
    return (
        <FlatList
            style={styles.list_style}
            data={props.data}
            renderItem={props.renderItem}
        />
    )
}

OrderList.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired
    ]),
    renderItem: PropTypes.func.isRequired
}

export default OrderList
