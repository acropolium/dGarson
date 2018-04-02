import { Platform, StyleSheet } from 'react-native'
import config from '../../../config'

export default StyleSheet.create({
    img_style: {
        backgroundColor: '#2a2a32',
        height: 70
    },
    selected_footer: {
        backgroundColor: '#caccd1',
        height: 8
    },
    custom_font: {
        fontFamily: config.custom_font
    },
    card_block_main: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    item_icon_style: {
        color: '#94979f',
        fontSize: 70
    },
    item_icon_add: {
        padding: 15,
        paddingTop: 20
    },
    item_icon_add_style: {},
    card_block_wrap: {
        borderTopWidth: 1,
        borderTopColor: '#94979f'
    },
    order_block_main: {
        alignItems: 'stretch'
    },
    order_block_add_main: {
        paddingTop: Platform.OS == 'ios' ? 5 : undefined,
        alignSelf: 'center'
    },
    order_block_bottom_divider: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 20
    },
    order_block_top_divider: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 20
    },
    order_block_wrap_tought: {
        marginLeft: 20
    },
    order_block_vertical_divider_left: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    order_block_vertical_divider_right: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    order_block_add_wrap: {
        alignSelf: 'center',
        marginBottom: 8
    },

    order_block_wrap: {
        marginRight: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card_block: {
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,
        height: 35
    },
    card_block_name_text: {
        paddingTop: Platform.OS == 'ios' ? 5 : undefined,
        fontSize: 20
    },
    price_block_wrap: {
        flexDirection: 'row'
    },
    price_block: {
        flexDirection: 'row'
    },
    price_block_divider: {
        borderColor: '#ddd',
        borderStyle: 'dashed',
        borderWidth: 1
    },
    price_block_price: {
        paddingTop: Platform.OS == 'ios' ? 5 : undefined,
        fontSize: 25
    },
    price_block_currency: {
        alignSelf: 'center'
    }
})
