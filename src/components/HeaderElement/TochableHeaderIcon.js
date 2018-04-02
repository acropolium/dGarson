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
                    iconFamily={props.iconFamily}
                    style={[
                        styles.header_icons,
                        styles[props.typeButton + '_header_icons_additionally']
                    ]}
                />
            </View>
        </TouchableHighlight>
    )
}

TochableHeaderIcon.propTypes = {
    press: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    iconFamily: PropTypes.string,
    typeButton: PropTypes.string.isRequired
}

export default TochableHeaderIcon
