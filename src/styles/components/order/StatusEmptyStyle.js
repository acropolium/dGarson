import { Platform, StyleSheet, Dimensions } from 'react-native';
import config from "../../../config";
let windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({


    wrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 40
    },

    text: {
        paddingBottom: 2
    }




});