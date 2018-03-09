import React from 'react';
import PropTypes from 'prop-types';
import { View} from 'react-native';
import MapView from 'react-native-maps';


import styles from "../../styles/components/LocationStyle";

const LocationFooter = (props) => {
    
    return (
        <View style={[styles.container, { height: props.getMapHeight() }]}>
                    <MapView
                        ref={props.setRef}
                        style={[styles.map, { height: props.getMapHeight() }]}

                        initialRegion={props.initialRegion}
                    >
                        {Object.values(props.markers).map(marker => (
                            <MapView.Marker

                                ref={ref => { this[marker.key] = ref; }}

                                title={marker.title}
                                key={marker.key}
                                identifier={marker.key}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                onPress={() => props.locationChooser(marker.location, true)}
                            >
                            </MapView.Marker>
                        ))}


                    </MapView>
                </View>
    );
};

LocationFooter.propTypes = {
    initialRegion:PropTypes.object.isRequired,
    getMapHeight: PropTypes.func.isRequired,
    locationChooser: PropTypes.func.isRequired,
    
    
};


export default LocationFooter;
