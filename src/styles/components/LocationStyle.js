import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from "../../config";
let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
    },

    footer_wrap: {
        borderTopWidth: 3,
        borderTopColor: '#000',
    },

    img: {
        width: 6,
        height: 6
    },

    text: {

        paddingBottom: 0,
        fontSize: 14,
        marginLeft: 10
    },

    location_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1, borderBottomColor: '#94979f',
    },

    header_icons: {
        color: 'white',
        fontSize: 20
    },

    header_main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a31',
        padding: 10,
        paddingTop: 4,
        paddingBottom: 7,
    },

    menu_button: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    overlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(42, 42, 50, 0.8)',
        marginTop: Platform.OS == 'ios' ? 20 : 0
    },

    container: {
        width: windowWidth,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    map: {
        width: windowWidth,
    },

    location_footer_wrap: {
        backgroundColor: '#4195d1'
    },

    wrap_icon_footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 70
    }

});