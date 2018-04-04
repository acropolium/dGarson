import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

const BaseTouchableHighlight = props => {
    return (
        <TouchableHighlight
            onHideUnderlay={props.onHideUnderlay}
            onShowUnderlay={props.onShowUnderlay}
            style={props.style}
            activeOpacity={props.activeOpacity}
            underlayColor={props.underlayColor}
            onPress={props.onPress}>
            {props.children}
        </TouchableHighlight>
    );
};

BaseTouchableHighlight.propTypes = {
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    onHideUnderlay: PropTypes.func,
    onShowUnderlay: PropTypes.func,
    onPress: PropTypes.func,
};

BaseTouchableHighlight.defaultProps = {
    activeOpacity: 0.2,
};

export default BaseTouchableHighlight;
