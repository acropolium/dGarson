import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'
let windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    wrap: {
        flexDirection: 'column'
    },

    top_text: {
        padding: 10,
        paddingBottom: 2,
        textAlign: 'center'
    },

    medium_text: {
        padding: 10,
        paddingTop: 2,
        textAlign: 'center'
    },

    wrap_botton_text: {
        flexDirection: 'row',
        backgroundColor: '#e6e7eb',
        justifyContent: 'space-between'
    },
    botton_text: {
        paddingRight: 10,
        paddingTop: 8
    }
})
