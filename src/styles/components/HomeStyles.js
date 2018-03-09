import { Platform, StyleSheet } from 'react-native';
import config from "../../config";

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
    },

    product_title: {
        paddingTop: 50,
        fontFamily: config.custom_font,
        fontSize: 50,
        color: 'white',
        backgroundColor: 'transparent',
    },

    phone_block: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 30,
        paddingTop: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#000',

    },

    register_style: {
        paddingTop: 30,
        paddingBottom: 45,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
    },

    container: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
        flex: 1
    },

    bg: {
        flex: 1,
        width: null, height: null,
        marginTop: Platform.OS == 'ios' ? 20 : undefined,
    },

    content_block: {
        flex: 1
    },

    number1: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 0,
        paddingLeft: 3,
        fontSize: 18,
        width: 28,
        margin: 0
    },

    number2: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 0,
        paddingLeft: 3,
        fontSize: 18,
        width: 90,
        margin: 0
    },

    wrap_view_text: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    animated_text: {
        fontSize: 18,
        margin: 0
    }
    ,
    wrap_view_button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrap_button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});