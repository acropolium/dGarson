import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import config from "./icon_config/config"

const ICON_FAMILY = {
    'Ionicons': Ionicons, 'Entypo': Entypo, 'FontAwesome': FontAwesome, 'Foundation': Foundation,
    'MaterialIcons': MaterialIcons, 'Octicons': Octicons, 'Zocial': Zocial, 'SimpleLineIcons': SimpleLineIcons,
    'default': Ionicons
}


const Icon = props => {

    let iconFamily = config[props.name]['iconFamily']
    let Icon = ICON_FAMILY[iconFamily] ? ICON_FAMILY[iconFamily] : ICON_FAMILY['default']

    return <Icon {...config[props.name]} />

}

export default Icon
