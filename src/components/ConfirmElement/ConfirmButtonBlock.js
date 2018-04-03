import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, Text } from 'react-native'
import Button from '../../widgets/buttons/styledButton'
import I18n from '../../services/translate.js'
import styles from '../../styles/components/ConfirmStyle'
const ConfirmButtonBlock = props => {
    return (
        <View style={styles.confirm_buttons_wrap}>
            <View style={styles.confirm_button}>
                <Button
                    title={I18n.t('confirm_code').toUpperCase()}
                    onPress={props.sendData}
                    iconName="confirm_button"
                />
            </View>
            <View style={styles.resend_sms_button}>
                <TouchableHighlight onPress={props.goBack}>
                    <Text style={styles.resend_sms_text}>
                        {I18n.t('resend_confirmation_code')}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

ConfirmButtonBlock.propTypes = {
    sendData: PropTypes.func,
    goBack: PropTypes.func
}

export default ConfirmButtonBlock
