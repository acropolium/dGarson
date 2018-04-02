import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../config'

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    order_block_additions_text: {
        fontSize: 12
    },

    addition_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e6e7eb',
        paddingRight: 11,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        borderBottomColor: '#caccd1',
        borderBottomWidth: 1
    }
})
