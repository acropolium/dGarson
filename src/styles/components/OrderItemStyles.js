import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../config'

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    order_block_footer: {
        backgroundColor: '#bbbcc1',
        height: 2
    },

    order_block_main: {
        backgroundColor: '#caccd1',
        padding: 10,
        paddingBottom: 0
    },

    order_block_element_name: {
        color: '#2a2a31'
    },
    order_block_element_price: {
        color: '#94979f'
    },

    item_icon_remove: {
        padding: 5,
        paddingRight: 15,
        paddingLeft: 15
    },

    item_icon_collapse: {
        padding: 5,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 10
    },

    order_block_element: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        maxWidth: 280
    },
    order_additions_element: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 9,
        paddingTop: 3,
        paddingLeft: 5
    },

    order_block_additions_text: {},

    order_block_wrap: {},

    order_block_element_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingLeft: 10
    },

    order_block_add_main: {},

    order_block_additions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e6e7eb',
        paddingLeft: 10
    },

    order_block_add_main_additions: {},

    order_block_bottom_divider_additions: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    order_block_wrap_tought_additions: {
        marginLeft: 20
    },

    order_block_vertical_divider_left_additions: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    order_block_vertical_divider_right_additions: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    order_block_add_wrap_additions: {
        alignSelf: 'stretch',
        marginBottom: 4,
        marginTop: 4,
        flexDirection: 'row'
    },

    order_block_wrap_additions: {
        marginRight: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
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

    order_block_remove: {
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10
    }
})
