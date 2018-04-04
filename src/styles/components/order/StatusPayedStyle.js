import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from '../../../config';
let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
    },

    wrap: {
        flexDirection: 'column',
    },

    text: {
        padding: 10,
        paddingBottom: 2,
        textAlign: 'center',
    },

    wrap_button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    button: {
        width: windowWidth - 160,
    },
});
