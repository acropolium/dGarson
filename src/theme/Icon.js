import React, {Component} from 'react';
import defaultTheme from '../theme/defaultTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class soIcon extends Component {
    getTheme() {
        return this.props.theme ? this.props.theme : defaultTheme
    }

    componentWillMount() {
        let iconFamily = this.props.hasOwnProperty('iconFamily')?this.props.iconFamily:this.getTheme().iconFamily;


        switch(iconFamily) {
            case 'Ionicons':
                this.Icon = Ionicons;
                break;
            case 'Entypo':
                this.Icon = Entypo;
                break;
            case 'SimpleLineIcons':
                this.Icon = SimpleLineIcons;
                break;
            case 'EvilIcons':
                this.Icon = EvilIcons;
                break;
            case 'FontAwesome':
                this.Icon = FontAwesome;
                break;
            case 'Foundation':
                this.Icon = Foundation;
                break;
            case 'MaterialIcons':
                this.Icon = MaterialIcons;
                break;
            case 'Octicons':
                this.Icon = Octicons;
                break;
            case 'Zocial':
                this.Icon = Zocial;
                break;
            default:
                this.Icon = Ionicons;
        }
    }

    render(){
        let Icon = this.Icon;
        return <Icon/>;
    }

}