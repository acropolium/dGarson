import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from "../../../config";
let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({

    total_color: {
        paddingBottom: 5,
        color: '#345e80',

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
        padding: 10,
    },


    custom_font: {
        fontFamily: config.custom_font,
    },

    preview_main: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 7,
    },

    text: {
        paddingTop: 3,
        paddingBottom: 0,
        color: 'white',
        fontSize: 14,
        marginRight: 5
    }

});