import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'
let windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },
    addition_block_text: {
        fontSize: 12,
        color: '#94979f'
    },
    addition_block_text_plus: {
        fontSize: 12
    },

    item_block: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_price_text: {
        color: '#89BCE2',
        fontSize: 15
    },

    item_name_text: {
        fontSize: 15
    },

    item_block_main: {
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomColor: '#bbbcc1',
        borderRightColor: '#bbbcc1',
        borderBottomWidth: 2,
        borderRightWidth: 1
    },

    wrap_order: {
        padding: 9,
        paddingBottom: 0
    }
})
