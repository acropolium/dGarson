import React, { Component } from 'react';
import {Dimensions, Platform} from 'react-native';
import HeaderBlock from './HeaderBlock';
import {View} from './BaseComponents';
import styles from "../styles/components/LocationStyle";
import LocationFooter from "./LocationComponents/LocationFooter"
import LocationMap from "./LocationComponents/LocationMap"

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

        this.markers = {};
        this.locationList = [];
        let cords = [];

        if (this.props.company_info.hasOwnProperty('locations')) {
            this.locationList = this.props.company_info.locations;

        }

        if (!this.locationList.length) {
            alert('sorry this location is unavailable')
            this.props.changePage('menu');
        }

        this.locationList.forEach((val) => {

            if (!val.lat || !val.lng) {
                alert('sorry this location is unavailable')
                this.props.changePage('menu');

            } else {

                this.markers['m_' + val.id] = {
                    key: 'm_' + val.id,
                    latitude: parseFloat(val.lat),
                    longitude: parseFloat(val.lng),
                    title: this.getCurrentAddress(val),
                    location: val
                };
            }
        });
    }

    componentDidMount() {

        if (this.locationList.length) {
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
        this.props.changePage('menu', false);
    };

    setLocationId = async () => {

        this.closeModal();
    };

    locationChooser = async (location, fromMarker = false) => {

        if (!fromMarker) {


            this.map.animateToCoordinate({
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lng),
            });
        }


        this.props.setCurrentLocation(location.id, this.props.current_company_id)

    };

    measureView(event) {

    }

    getCurrentAddress(location) {
        return location.address + ', ' + location.phone;
    }

    isCurrentLocation(location) {

        return location.id == this.props.current_location;

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

    render() {
        return (
            <View style={styles.overlayStyle}>
                <View>
                    <HeaderBlock company_info={this.props.company_info} centerTitle={this.props.company_info.name} backButton={this.closeModal} showCheck={this.setLocationId} />
                </View>

                <LocationMap setRef={ref => { this.map = ref; }} initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }} getMapHeight={() => this.getMapHeight()} locationChooser={this.locationChooser} markers={this.markers} />

                < LocationFooter locationList={this.locationList}
                    getCurrentAddress={this.getCurrentAddress} isCurrentLocation={(location) => { return this.isCurrentLocation(location) }}
                    measureView={this.measureView} getLocationsHeight={this.getLocationsHeight}
                    locationChooser={this.locationChooser} />
            </View>
        )
    }
}

