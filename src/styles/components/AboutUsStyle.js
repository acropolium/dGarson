import { StyleSheet, Dimensions } from 'react-native';
import config from "../../config";
import Text from '../../components/BaseComponents/Components/Text';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;


export default StyleSheet.create({

    allWrap: {
        flex: 1,

    },

    line: {
        width: 95 + "%",
        height: 0.5,
        backgroundColor: 'white',


    },

    wrapLine: {

        flexDirection: 'row',
        justifyContent: 'center',
        margin:2+"%",
},

    backGroundImg: {
        width: windowWidth,
        height: windowHeight,
        opacity: 0.2,
        position: "absolute"
    },

    link: {
        color: "blue",
        textDecorationLine: 'underline'
    },
    wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    textColor: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#303338",
        fontFamily: config.custom_font,
        paddingTop: 2+"%",
        fontSize: 17,

    },

    head: {

        fontSize: 30,
        marginBottom: 2+"%",
    },

    wrap_img: {
        marginTop: 2+"%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 2+"%",


    },

    item_image: {
        borderRadius: 85,
        borderWidth: 0.5,
        borderColor: 'black',

        width: 170,
        height: 170,
    },


});