import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    content: {
        marginLeft: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    },

    icon_class: {
        color: '#fff',
        fontSize: 35,
        padding: 0,
        margin: 0,
        marginLeft: 20,
        marginRight: 5
    },
    icon_class_left: {
        color: '#fff',
        fontSize: 20,
        padding: 0,
        margin: 0,
        marginLeft: 5,
        marginRight: 10
    }
})
