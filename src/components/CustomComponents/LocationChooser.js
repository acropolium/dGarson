import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config';
import UserApi from '../../services/userService';
import I18n from '../../services/translate.js';
import {Text, View, TouchableHighlight, Icon} from '../BaseComponents';
import  styles from "../../styles/components/CustomComponents/LocationChooserCss";
const userService = new UserApi();


export default class LocationChooser extends Component {
    constructor(props){
        super(props);
        userService.setProps(props);

    };

    locationChooser = () => {
        if (userService.get('company_info').hasOwnProperty('locations') && userService.get('company_info').location !==false) {
            
            userService.changePage('location', false, false);
        }
    };

    getCurrentAddress = () => {
        let location = userService.get('company_info').address+', '+I18n.t("phone")+':'+userService.get('company_info').phone;

        if (userService.get('company_info').hasOwnProperty('locations')){
            userService.get('company_info').locations.forEach(function(val) {
                if (val.id == userService.get('location')){
                    location = val.address+', '+I18n.t("phone")+':'+val.phone;
                }
            });
        }
        return location;
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.locationChooser} >
                    <View style={styles.location_main}>
                        <Icon iconFamily="SimpleLineIcons" name='location-pin' style={[styles.header_icons,{color:'#94979f'}]} />
                        <Text numberOfLines={1} style={styles.locationText}>{this.getCurrentAddress()}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

LocationChooser.propTypes = {

};

LocationChooser.defaultProps = {

};
