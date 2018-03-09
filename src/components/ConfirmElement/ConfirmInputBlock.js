import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../../services/translate.js'
import styles from "../../styles/components/ConfirmStyle";
import TextInput from "../BaseComponents/Components/TextInput";


export default class ConfirmInputBlock extends Component {
    constructor(props) {
        super(props);
        this.state={}

    };

    render() {
        return (
            <View style={styles.phone_block}>

                <View style={styles.number_wrap}>
                    <TextInput
                        keyboardType="phone-pad"
                        defainRef={el => this.firstInput = el}
                        autoFocus={true}
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"

                        onChangeText={(code) => {
                            this.props.confirm.setState({ code1: code });
                            if (code.length == 1)
                                this.secondInput.focus();
                        }}
                        value={this.props.confirm.state.code1}
                        style={styles.number}

                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => this.secondInput = el}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"

                        onChangeText={(code) => {
                            this.props.confirm.setState({ code2: code });
                            if (code.length == 1)
                                this.thirdInput.focus();
                            if (code.length == 0)
                                this.firstInput.focus();
                        }}

                        value={this.props.confirm.state.code2}
                        style={styles.number}
                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => this.thirdInput = el}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"

                        onChangeText={(code) => {
                            this.props.confirm.setState({ code3: code });
                            if (code.length == 1)
                                this.fourthInput.focus();
                            if (code.length == 0)
                                this.secondInput.focus();
                        }}


                        value={this.props.confirm.state.code3}
                        style={styles.number}
                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => this.fourthInput = el}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"

                        onChangeText={(code) => {
                            this.props.confirm.setState({ code4: code });

                            if (code.length == 1)
                                this.fourthInput.blur();
                            if (code.length == 0)
                                this.thirdInput.focus();
                            //this.sendData()
                        }}
                        value={this.props.confirm.state.code4}

                        style={styles.number}
                    />
                </View>

            </View>

        );
    }
}

ConfirmInputBlock.propTypes = {

    confirm: PropTypes.object.isRequired,
}


