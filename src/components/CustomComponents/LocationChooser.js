import React, { Component } from 'react';
import I18n from '../../services/translate.js';
import { Text, View, TouchableHighlight, Icon } from '../BaseComponents';
import styles from '../../styles/components/CustomComponents/LocationChooserCss';
import { LOCATION_SCENE } from '../../scene/sceneConstant.js';

export default class LocationChooser extends Component {
    constructor(props) {
        super(props);
    }

    locationChooser = () => {
        if (
            this.props.company_info.hasOwnProperty('locations') &&
            this.props.currentLocation !== false
        ) {
            this.props.changePage(LOCATION_SCENE, false);
        }
    };

    getCurrentAddress = () => {
        let location =
            this.props.company_info.address +
            ', ' +
            I18n.t('phone') +
            ':' +
            this.props.company_info.phone;

        if (this.props.company_info.hasOwnProperty('locations')) {
            this.props.company_info.locations.forEach(val => {
                if (val.id == this.props.currentLocation) {
                    location =
                        val.address + ', ' + I18n.t('phone') + ':' + val.phone;
                }
            });
        }
        return location;
    };

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.locationChooser}>
                    <View style={styles.location_main}>
                        <Icon name="location_menu_footer" />
                        <Text numberOfLines={1} style={styles.locationText}>
                            {this.getCurrentAddress()}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
