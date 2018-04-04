import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import Icon from '../BaseComponents/Components/Icon';
import Image from '../BaseComponents/Components/Image';
import styles from '../../styles/components/LocationStyle';

const LocationFooter = props => {
    return (
        <View
            style={[
                styles.footer_wrap,
                { height: props.getLocationsHeight() },
            ]}>
            <ScrollView>
                <View>
                    {props.locationList.map(location => (
                        <View key={'l' + location.id}>
                            <TouchableHighlight
                                onPress={() => props.locationChooser(location)}>
                                <View
                                    style={[
                                        styles.location_main,
                                        props.isCurrentLocation(location)
                                            ? styles.location_footer_wrap
                                            : {},
                                    ]}
                                    onLayout={event =>
                                        props.measureView(event)
                                    }>
                                    <View style={styles.wrap_icon_footer}>
                                        <Icon
                                            name={
                                                props.isCurrentLocation(
                                                    location
                                                )
                                                    ? 'location_footer_active'
                                                    : 'location_footer_passive'
                                            }
                                        />
                                        <Text
                                            numberOfLines={1}
                                            style={[
                                                styles.custom_font,
                                                styles.text,
                                                {
                                                    color: props.isCurrentLocation(
                                                        location
                                                    )
                                                        ? '#fff'
                                                        : '#94979f',
                                                },
                                            ]}>
                                            {props.getCurrentAddress(location)}
                                        </Text>
                                    </View>
                                    <View>
                                        {props.isCurrentLocation(location) ? (
                                            <Image
                                                source={require('../../media/elements/location_selected.png')}
                                                style={styles.img}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../../media/elements/location_list.png')}
                                            />
                                        )}
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

LocationFooter.propTypes = {
    getCurrentAddress: PropTypes.func.isRequired,
    getLocationsHeight: PropTypes.func.isRequired,
    locationChooser: PropTypes.func.isRequired,
    isCurrentLocation: PropTypes.func.isRequired,
    measureView: PropTypes.func.isRequired,
};

export default LocationFooter;
