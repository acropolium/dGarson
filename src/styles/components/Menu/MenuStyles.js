import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    menuContainer:{
        flex:1,
        marginTop: Platform.OS == 'ios' ? 20 : undefined
    },
    menuHeaderContainer:{
        flex:0.6
    }, 
    menuFooterContainer:{
        flex:1.2
    },
    menuItemsContainer:{ 
        flex: Platform.OS == 'ios' ? 8 : 7
    },
});