import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

const KeyboardWrapper = (props) => {
    return (
        <KeyboardAvoidingView {...props}>{props.children}</KeyboardAvoidingView>
    );
};

KeyboardWrapper.propTypes = {

};

KeyboardWrapper.defaultProps = {
};

export default KeyboardWrapper;