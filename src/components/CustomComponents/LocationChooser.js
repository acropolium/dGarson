import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config';
import UserApi from '../../services/userService';
import I18n from '../../services/translate.js';
import {Text, View, TouchableHighlight, Icon} from '../BaseComponents';
import  styles from "../../styles/components/CustomComponents/LocationChooserCss";
import * as routeService from "../../services/routeService";
const userService = new UserApi();


export default class LocationChooser extends Component {
    constructor(props){
        super(props);
       

    };

    locationChooser = () => {
        if (this.props.company_info.hasOwnProperty('locations') && (this.props.currentLocation !==false)) {
            
            routeService.changePage('location', false);
        }
    };

    getCurrentAddress = () => {
        let location = this.props.company_info.address+', '+I18n.t("phone")+':'+this.props.company_info.phone;

        if (this.props.company_info.hasOwnProperty('locations')){
            this.props.company_info.locations.forEach((val)=> {
                if (val.id == this.props.currentLocation){
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
