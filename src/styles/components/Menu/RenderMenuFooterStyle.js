import {Platform, StyleSheet} from 'react-native';
import config from "../../../config";



export default StyleSheet.create({
    custom_font: {
        fontFamily: config.custom_font,
        color:'white', 
        fontSize:14, 
        marginRight:10
    },
    
    previewOrderIcon: {
        fontSize:38, 
        color:'white'
    },

    footer_main:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#2a2a31',
    },

    total_block:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        padding:12,       
    },

    total_color:{
        paddingBottom:5,
        color:'#345e80'
    },

    preview_main:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingTop:4,
        paddingLeft:10,
        paddingRight:10        
    },
});