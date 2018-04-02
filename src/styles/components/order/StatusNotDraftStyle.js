import { Platform, StyleSheet, Dimensions } from 'react-native'
import config from '../../../config'
let windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        backgroundColor: '#e6e7eb',
        justifyContent: 'space-between'
    },

    text: {
        paddingRight: 10,
        paddingTop: 8
    }
})
