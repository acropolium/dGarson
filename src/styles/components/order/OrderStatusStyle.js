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

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        paddingTop: 8,
        paddingRight: 8,
        fontSize: 16,
    },

    wrap_status_draft: {
        flexDirection: 'row',
        backgroundColor: '#e6e7eb',
        justifyContent: 'space-between',
    },

    wrap_block_status_draft: {
        padding: 0,
        paddingRight: 8,
        flexDirection: 'row',
    },
    text_size: {
        fontSize: 15,
    },
});
