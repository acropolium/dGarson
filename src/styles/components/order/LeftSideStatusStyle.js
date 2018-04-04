import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from '../../../config';
let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    timer_main: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
    },

    custom_font: {
        fontFamily: config.custom_font,
    },

    text: {
        paddingBottom: 5,
        color: '#94979f',
        fontSize: 14,
        marginLeft: 10,
    },
});
