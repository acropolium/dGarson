import { Platform, StyleSheet } from 'react-native'
import config from '../../../config'
import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    header_icons: {
        color: 'white',
        fontSize: 20
    },

    location_main: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#2a2a31',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#94979f'
    },

    locationText: {
        fontFamily: config.custom_font,
        paddingBottom: 5,
        color: '#94979f',
        fontSize: 14,
        marginLeft: 10,
        paddingRight: 25
    }
})
