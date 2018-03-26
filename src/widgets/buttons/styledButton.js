import React, { PropTypes, Component } from 'react'
import {    
    StyleSheet,
} from 'react-native';

import {View, Text,Icon, Button } from '../../components/BaseComponents';
import config from '../../config';
import  styles from "../../styles/widgets/buttons/StyledButtonCss";


export default class desButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      
        return (
            <Button buttonBorder={this.props.buttonBorder?this.props.buttonBorder:false} backgroundColor={this.props.backgroundColor||"#000"}  onPress={this.props.onPress} style={this.props.style}>
                <View style={[styles.content, {marginLeft: this.props.iconName?30:35}]}>
                    {this.props.iconNameLeft && <Icon iconFamily={this.props.iconFamily} name={this.props.iconNameLeft} style={styles.icon_class_left}/>}
                    <Text style={[styles.custom_font, {color:'white', fontSize: 15, marginRight: this.props.iconName?0:35}]}>{this.props.title}</Text>
                    {this.props.iconName && <Icon iconFamily={this.props.iconFamily} name={this.props.iconName} style={styles.icon_class}/>}
                </View>
            </Button>
        )
    }

}

