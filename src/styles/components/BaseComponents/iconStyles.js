import { StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

export default StyleSheet.create({

    preview_order: {
        fontSize: 38,
        color: 'white'
    },
    search_block_search: {
        color: 'white'
    },
    search_block_close: {
        color: 'white'
    },
    location_menu_footer: {
        color: '#94979f',
        fontSize: 20
    },
    header_icons: {
        color: 'white',
        fontSize: 20
    },
    check_button_header: {
        fontSize: 30
    },
    back_button_header: {
        fontSize: 35
    },
    location_footer_active: {
        color: '#000'
    },
    location_footer_passive: {
        color: '#94979f'
    },
    order_footer: {
        fontSize: 25,
        color: 'white',
        paddingTop: 6
    },
    clock_order_status: {
        color: '#2a2a31',
        fontSize: 30
    },
    order_draft_change_time: {
        paddingTop: 15,
        paddingRight: 5,
        fontSize: 14
    },
    button_right: {
        color: '#fff',
        fontSize: 35,
        padding: 0,
        margin: 0,
        marginLeft: 20,
        marginRight: 5
    },
    button_left: {
        color: '#fff',
        fontSize: 20,
        padding: 0,
        margin: 0,
        marginLeft: 5,
        marginRight: 10
    },
    modal_picker: {
        paddingTop: 15,
        paddingRight: 5,
        fontSize: 14
    }
})
