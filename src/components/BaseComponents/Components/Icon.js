import React from 'react';
import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ICON_FAMILY = ["Ionicons", "Entypo", "FontAwesome", "Foundation", "MaterialIcons", "Octicons", "Zocial", "SimpleLineIcons"];

const Icon = (props) => {
    
    let Icon;
    switch (props.iconFamily) {
        case "Ionicons":
            Icon = Ionicons;
            break;
        case "Entypo":
            Icon = Entypo;
            break;
        case "FontAwesome":
            Icon = FontAwesome;
            break;
        case "Foundation":
            Icon = Foundation;
            break;
        case "MaterialIcons":
            Icon = MaterialIcons;
            break;
        case "Octicons":
            Icon = Octicons;
            break;
        case "Zocial":
            Icon = Zocial;
            break;
        case "SimpleLineIcons":
            Icon = SimpleLineIcons;
            break;
        default:
            Icon = Ionicons;
    }
    return <Icon {...props} />
};

PropTypes.propTypes = {
    iconFamily: PropTypes.oneOf(ICON_FAMILY)
};

export default Icon;

