import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Icon, TouchableHighlight } from '../BaseComponents'
import styles from '../../styles/components/HeaderElement/HederIconStyle'

const TochableHeaderIcon = props => {
    return (
        <TouchableHighlight onPress={props.press}>
            <View style={styles[props.typeButton + '_wrap_icon']}>
                <Icon
                    name={props.iconName}
                />
            </View>
        </TouchableHighlight>
    )
}

TochableHeaderIcon.propTypes = {
    press: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    typeButton: PropTypes.string.isRequired
}

export default TochableHeaderIcon
