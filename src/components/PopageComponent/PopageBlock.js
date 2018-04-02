import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from '../../styles/components/PopageStyles'
import Image from '../BaseComponents/Components/Image'

const PopageBlock = props => {
    return (
        <View style={styles.wrap_block}>
            {props.dialog.hasOwnProperty('image') &&
                props.dialog.image == 'icon_ready' && (
                    <Image
                        source={require('../../media/elements/icon_ready.png')}
                        style={styles.img_block}
                    />
                )}

            {props.dialog.hasOwnProperty('image') &&
                props.dialog.image == 'icon_payed' && (
                    <Image
                        source={require('../../media/elements/icon_payed.png')}
                        style={styles.img_block}
                    />
                )}

            <View style={styles.wrap_text_block}>
                <Text style={styles.text_block}>{props.dialog.message}</Text>
            </View>
        </View>
    )
}

export default PopageBlock
