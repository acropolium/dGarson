import { Platform, StyleSheet } from 'react-native'
import config from '../../config'

export default StyleSheet.create({
    back_button_wrap: {
        width: 75,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    center_title_wrap: {
        paddingTop: 8,
        paddingBottom: 9,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    back_button: {
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#FFF'
    },

    custom_font: {
        fontFamily: config.custom_font
    },

    header_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a31',
        alignItems: 'center'
    },

    menu_button_wrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
        //marginRight: 5,
    },

    width_value: {
        width: 75
    },

    menu_button: {
        padding: 4,
        paddingTop: 9
    },

    justifyContent_value: {},

    header_text: {
        color: 'white',
        fontSize: 16
    }
})
