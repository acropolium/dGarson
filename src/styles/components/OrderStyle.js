import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../config'
let windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font
    },

    header_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a31',
        padding: 10,
        paddingTop: 4,
        paddingBottom: 7
    },

    header_icons: {
        color: 'white',
        fontSize: 20
    },

    menu_button: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    footer_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a31',
        width: windowWidth
    },

    total_block: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },

    total_color: {
        paddingBottom: 5,
        color: '#345e80'
    },

    preview_main: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 7
    },

    addition_block_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    keyboard_wrapper: {
        flex: 1,
        backgroundColor: '#cbccd1'
    },

    wrap: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : undefined
    },

    list_style: {
        borderTopWidth: 1,
        borderTopColor: '#94979f'
    }
})
