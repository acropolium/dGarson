'use strict';

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const PADDING = 7;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 400;

import config from '../../../config';

export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
    },

    overlayStyle: {
        width: width,
        height: height,

    },

    optionContainer: {
        height: OPTION_CONTAINER_HEIGHT,
        marginTop: 40,

    },

    cancelContainer: {
        left: width * 0.1,
        top: 30,
        height: (height - OPTION_CONTAINER_HEIGHT) - 100
    },

    selectStyle: {

        flexDirection: 'row'
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        padding: 10,
        fontSize: FONT_SIZE
    },

    cancelStyle: {
        borderRadius: BORDER_RADIUS,
        width: width * 0.8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: PADDING
    },

    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE
    },

    optionStyle: {
        padding: 15,
        paddingBottom: 12,
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    optionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: '#94979f'
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE
    }
});