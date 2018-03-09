import React, { Component } from 'react';
import { Linking, AsyncStorage, Animated, Modal, Dimensions, StyleSheet, Platform, Button, ScrollView } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';


import config from '../config';
import I18n from '../services/translate.js'
import HeaderBlock from './HeaderBlock';
import { Text, View, Image, TouchableHighlight } from './BaseComponents';

import UserApi from '../services/userService';
import styles from "../styles/components/LocationStyle";
import LocationFooter from "./LocationComponents/LocationFooter"
import LocationMap from "./LocationComponents/LocationMap"

const userService = new UserApi();

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

let OS_MARGIN = Platform.OS === 'ios' ? 25 : 25;

const ASPECT_RATIO = windowWidth / 400;
const LATITUDE = 51.490454;
const LONGITUDE = 31.300784;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };

export default class Location extends Component {

    constructor(props) {
        super(props);

        userService.setProps(this.props);
        console.log("construkt")
        this.state = {
            location: userService.get('location')
        };

        this.markers = {};

        let that = this;
        this.locationList = [];

        let cords = [];

        if (userService.get('company_info').hasOwnProperty('locations')) {
            this.locationList = userService.get('company_info').locations;

        }

        if (!this.locationList.length) {
            alert('sorry this location is unavailable')
            userService.changePage('menu');
        }

        this.locationList.forEach(function (val) {

            if (!val.lat || !val.lng) {
                alert('sorry this location is unavailable')
                userService.changePage('menu');

            } else {

                that.markers['m_' + val.id] = {
                    key: 'm_' + val.id,
                    latitude: parseFloat(val.lat),
                    longitude: parseFloat(val.lng),
                    title: that.getCurrentAddress(val),
                    location: val
                };
            }
        });
    }




    componentDidMount() {

        if (userService.get('location')) {
            let animationTimeout = setTimeout(() => {

                if (this.locationList.length == 1 && this.locationList[0].lat && this.locationList[0].lng)
                    this.locationChooser(this.locationList[0])
                else
                    if (this.locationList.length > 1 && this.locationList[0].lat && this.locationList[0].lng)
                        this.fitTo();

            }, 1000);
        }
    }

    fitTo = () => {

        this.map.fitToCoordinates(
            Object.values(this.markers),
            {
                edgePadding: DEFAULT_PADDING,
                animated: false,
            }
        );
    };

    isFunction = (functionToCheck) => {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };

    closeModal = () => {
        userService.changePage('menu', false, false);
    };

    setLocationId = async () => {
        userService.set({ location: this.state.location });
        this.closeModal();
    };

    locationChooser = async (location, fromMarker = false) => {

        if (!fromMarker) {


            this.map.animateToCoordinate({
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lng),
            });
        }


        this.setState({ location: location.id });
    };

    measureView(event) {

    }

    getCurrentAddress(location) {
        return location.address + ', ' + location.phone;
    }

    isCurrentLocation(location) {

        return location.id == this.state.location;

    }

    getMapHeight() {
        switch (this.locationList.length) {
            case 0:
                return undefined;
            case 1:
                return windowHeight - 57 - 57;
                break;
            case 2:
                return windowHeight - 57 - 100;
                break;
            case 3:
                return windowHeight - 57 - 142;
                break;
            default:
                return windowHeight - 57 - 184;
                break;
        }
    }
    getLocationsHeight() {
        if (this.locationList.length > 4) {
            return 170;
        } else {
            return undefined;
        }
    }

    getCurrentCoordinates() {
        if (this.locationList.length > 0) {
            let location = this.locationList[0].lat + ',' + this.locationList[0].lng;
            let that = this;

            this.locationList.forEach(function (val) {
                if (val.id === userService.get('location')) {
                    location = val.lat + ',' + val.lng;
                }
            });


            return location;
        }
        return '';
    }

    render() {
        return (
            <View style={styles.overlayStyle}>
                <View>
                    <HeaderBlock  {...this.props} centerTitle={userService.get('company_info').name} backButton={this.closeModal} showCheck={this.setLocationId} />
                </View>

                <LocationMap setRef={ref => { this.map = ref; }} initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }} getMapHeight={() => this.getMapHeight()} locationChooser={this.locationChooser} markers={this.markers} />

                < LocationFooter locationList={this.locationList}
                    getCurrentAddress={this.getCurrentAddress} isCurrentLocation={(location) => { this.isCurrentLocation(location) }}
                    measureView={this.measureView} getLocationsHeight={this.getLocationsHeight}
                    locationChooser={this.locationChooser} />
            </View>
        )
    }
}

