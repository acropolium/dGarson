import React, { Component } from 'react';
import { Animated, Modal, Dimensions, StyleSheet, Platform } from 'react-native';
import I18n from '../services/translate.js'
import { Actions } from 'react-native-router-flux';
import styles from "../styles/components/PopageStyles";
import PopageButton from './PopageComponent/PopageButton';
import PopageBlock from './PopageComponent/PopageBlock';
import { Image, Text, View } from './BaseComponents';
import Button from '../widgets/buttons/styledButton';




export default class Popage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillUnmount() {
        this.props.dialogActions.dialogHide();
    }

    setModalHidden = () => {
        Actions.pop();
    };

    approve = () => {
        this.setModalHidden();

        if (this.props.dialog.hasOwnProperty('callback') && this.props.dialog.callback !== false) {
            this.props.dialog.callback();
        }
    };

    isFunction = (functionToCheck) => {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };


    render() {
        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle, this.props.dialog.overlayStyle]} >
                <PopageBlock dialog={this.props.dialog} />
                <PopageButton {...this.props} approve={this.approve} setModalHidden={this.setModalHidden} />
            </View>
        )
    }
}

