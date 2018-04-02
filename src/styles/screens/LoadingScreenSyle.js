import { Platform, StyleSheet } from 'react-native'
import config from '../../config'

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    product_title: {
        fontFamily: config.custom_font,
        fontSize: 50,
        backgroundColor: 'transparent',
        color: 'white'
    },
    copyright_title: {
        fontFamily: config.custom_font,
        fontSize: 30,
        color: 'white'
    },

    bg: {
        flex: 1,
        width: null,
        height: null,
        marginTop: Platform.OS == 'ios' ? 20 : undefined
    },
    wrap_animate: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
