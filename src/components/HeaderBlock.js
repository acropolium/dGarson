import React, { Component } from 'react';
import { Linking } from 'react-native';
import styles from '../styles/components/HeaderBlockStyle';
import TochableHeaderIcon from './HeaderElement/TochableHeaderIcon';
import { Text, View } from './BaseComponents';
import * as routeService from '../services/routeService';
import { COMPANIES_SCENE } from '../scene/sceneConstant.js';

export default class HeaderBlock extends Component {
    constructor(props) {
        super(props);
    }

    getCurrentCoordinates = () => {
        if (this.props.company_info) {
            if (
                this.props.company_info.hasOwnProperty('locations') &&
                this.props.company_info.locations.length > 0
            ) {
                let location =
                    this.props.company_info.locations[0].lat +
                    ',' +
                    this.props.company_info.locations[0].lng;
                this.props.company_info.locations.forEach(val => {
                    if (val.id == this.props.currentLocation) {
                        location = val.lat + ',' + val.lng;
                    }
                });

                return location;
            }
        }
        return false;
    };

    handleClickUrl = link => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log("Don't know how to open URI: " + link);
            }
        });
    };

    goBack = () => {
        routeService.changePage(COMPANIES_SCENE);
    };

    renderRightSide = () => {
        return (
            <View style={[styles.menu_button_wrap, styles.width_value]}>
                <View
                    style={[
                        styles.menu_button_wrap,
                        this.props.showCheck || this.props.aboutAs
                            ? styles.justifyContent_value
                            : {},
                    ]}>
                    {this.props.company_info &&
                        this.props.company_info.phone &&
                        !this.props.showCheck &&
                        !this.props.hideRightBlock && (
                            <TochableHeaderIcon
                                press={() => {
                                    this.handleClickUrl(
                                        'tel:' + this.props.company_info.phone
                                    );
                                }}
                                iconName="mobile_header"
                                typeButton="mobile_button"
                            />
                        )}
                    {this.getCurrentCoordinates() &&
                        !this.props.showCheck &&
                        !this.props.hideRightBlock && (
                            <TochableHeaderIcon
                                press={() => {
                                    this.handleClickUrl(
                                        'geo:' +
                                            this.getCurrentCoordinates() +
                                            '?q=' +
                                            this.getCurrentCoordinates()
                                    );
                                }}
                                iconName="location_header"
                                typeButton="location_button"
                            />
                        )}
                    {this.props.showCheck && (
                        <TochableHeaderIcon
                            press={() => {
                                this.props.showCheck;
                            }}
                            iconName="check_header"
                            typeButton="check_button"
                        />
                    )}
                    {this.props.aboutAs && (
                        <TochableHeaderIcon
                            press={() => {
                                this.props.aboutAs();
                            }}
                            iconName="info_company"
                            typeButton="aboutus_button"
                        />
                    )}
                </View>
            </View>
        );
    };

    render() {
        let backButton = this.goBack;

        return (
            <View style={styles.header_main}>
                <View style={[styles.back_button_wrap]}>
                    <TochableHeaderIcon
                        press={
                            typeof this.props.backButton === 'function'
                                ? this.props.backButton
                                : backButton
                        }
                        iconName="header_back_button"
                        typeButton="back_button"
                    />
                </View>
                <View style={[styles.center_title_wrap]}>
                    <Text style={[styles.custom_font, styles.header_text]}>
                        {this.props.centerTitle}
                    </Text>
                </View>
                {this.renderRightSide()}
            </View>
        );
    }
}
