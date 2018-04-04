import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from '../../../../config';

let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    preview_main: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 7,
    },

    custom_font: {
        fontFamily: config.custom_font,
    },

    text_style: {
        paddingTop: 3,
        paddingBottom: 0,
        color: 'white',
        fontSize: 14,
        marginRight: 5,
    },
});
