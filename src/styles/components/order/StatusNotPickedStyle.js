import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'
let windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    wrap: {
        backgroundColor: '#2a2a32'
    },

    wrap_text: {
        flexDirection: 'row'
    },

    text: {
        padding: 10,
        paddingBottom: 2,
        textAlign: 'center',
        color: '#94979f'
    },

    wrap_button: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },

    button: {
        width: windowWidth - 80
    }
})
