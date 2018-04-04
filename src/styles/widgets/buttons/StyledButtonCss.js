import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from '../../../config';

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
    },

    content: {
        marginLeft: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
});
