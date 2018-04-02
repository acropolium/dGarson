import { Platform, StyleSheet } from 'react-native'
import config from '../../config'

export default StyleSheet.create({
    wrap_text: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    custom_font: {
        fontFamily: config.custom_font
    },

    confirm_buttons_wrap: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10
    },

    confirm_button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    resend_sms_button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },

    resend_sms_text: {
        fontSize: 18,
        borderBottomWidth: 1,
        color: 'black'
    },

    product_title: {
        paddingTop: 50,
        fontFamily: config.custom_font,
        fontSize: 50,
        color: 'white',
        backgroundColor: 'transparent'
    },

    container: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
        flex: 1
    },
    content_block: {
        flex: 1
    },

    bg: {
        flex: 1,
        width: null,
        height: null,
        marginTop: Platform.OS == 'ios' ? 20 : undefined
    },

    phone_block: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 30,
        paddingTop: 50
    },
    register_style: {
        paddingTop: 30,
        paddingBottom: 45,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },

    number_wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#000',
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        paddingLeft: Platform.OS == 'ios' ? 5 : 2,
        paddingRight: 5
    },

    number: {
        justifyContent: 'center',
        textAlign: 'center',
        padding: 0,
        left: 2,
        paddingBottom: -4,
        fontSize: 24,
        width: 28,
        height: 28,
        margin: 0
    }
})
