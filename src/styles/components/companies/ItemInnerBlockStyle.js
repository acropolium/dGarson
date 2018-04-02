import { Platform, StyleSheet } from 'react-native'
import config from '../../../config'

export default StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    item_image: {
        width: 50,
        height: 50
    },
    custom_font: {
        fontFamily: config.custom_font
    },
    item_name: {
        fontSize: 18
    },
    item_price: {
        alignSelf: 'flex-start',
        color: '#94979f',
        marginTop: -2
    },
    item_icon: {
        padding: 10
    },
    wrap_text_block: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    wrap_text: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})
