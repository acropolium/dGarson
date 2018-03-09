import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from "../../config";
let windowWidth = Dimensions.get('window').width;
let OS_MARGIN = Platform.OS === 'ios' ? 25 : 25;
let windowHeight = Dimensions.get('window').height;



export default StyleSheet.create({

    overlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(42, 42, 50, 0.97)',
    },
    wrap_all: {
        height: 250 - OS_MARGIN,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wrap_button: {
        justifyContent: 'center'
    },
    button: {
        width: windowWidth - 80
    },
    botton_button_wrap: {
        marginTop: 30
    },
    wrap_block:
        {
            height: windowHeight - 250,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
    img_block: {
        marginBottom: 30
    },
    wrap_text_block: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center'
    },
    text_block: { 
        fontSize: 25, 
        color: 'white', 
        textAlign: 'center' }
});