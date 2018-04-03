import React from 'react'
import PropTypes from 'prop-types'
import { Icon, View, Text } from '../../BaseComponents'
import I18n from '../../../services/translate.js'
import styles from '../../../styles/components/order/StatusPayedStyle'
import Button from '../../../widgets/buttons/styledButton'

const StatusPayed = props => {
    return (
        <View>
            <View style={styles.wrap}>
                <Text style={[styles.custom_font, styles.text]}>
                    {I18n.t('your_order_payed_part_1') + ' #' + props.orderId}{' '}
                    {I18n.t('payed_info_message')}
                </Text>
                <View style={styles.wrap_button}>
                    <Button
                        buttonBorder="#94979f"
                        iconNameLeft="payed_button"
                        backgroundColor="#2A2A32"
                        style={styles.button}
                        title={I18n.t('menu').toUpperCase()}
                        onPress={props.goBack}
                    />
                </View>
            </View>
        </View>
    )
}

StatusPayed.propTypes = {
    goBack: PropTypes.func.isRequired
}

export default StatusPayed
