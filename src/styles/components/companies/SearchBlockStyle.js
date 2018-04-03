import { Platform, StyleSheet } from 'react-native'
import config from '../../../config'

export default StyleSheet.create({
    footer_main: {
        flexDirection: 'row',
        backgroundColor: '#2a2a31'
    },

    total_block: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        flex: 1
    },

    custom_font: {
        fontFamily: config.custom_font
    },

    number2: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 0,
        paddingLeft: 3,
        fontSize: 18,
        height: 25,
        margin: 0,
        color: '#fff',
        alignSelf: 'stretch'
    },

    preview_main: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 14,
        paddingLeft: 15,
        paddingRight: 15
    },

    touchable_icon: {
        padding: 0,
        margin: 0
    }
})
