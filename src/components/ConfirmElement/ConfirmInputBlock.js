import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../../services/translate.js';
import styles from '../../styles/components/ConfirmStyle';
import TextInput from '../BaseComponents/Components/TextInput';
import index from 'axios';

export default class ConfirmInputBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.tempCode = [];
    }

    componentDidMount() {
        this.inputs = {
            0: this.firstInput,
            1: this.secondInput,
            2: this.thirdInput,
            3: this.fourthInput,
        };
    }

    inputCode = (code, indx) => {
        this.tempCode[indx] = code;

        if (
            code.length == 1 &&
            indx + 1 <= Object.keys(this.inputs).length - 1
        ) {
            this.inputs[indx + 1].focus();
        } else {
            if (code.length == 1) {
                this.inputs[indx].blur();
            }
        }

        if (code.length == 0 && indx - 1 >= 0) this.inputs[indx - 1].focus();

        return this.tempCode;
    };

    render() {
        this.tempCode = this.props.confirm;

        return (
            <View style={styles.phone_block}>
                <View style={styles.number_wrap}>
                    <TextInput
                        keyboardType="phone-pad"
                        defainRef={el => (this.firstInput = el)}
                        autoFocus={true}
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        onChangeText={code => {
                            this.props.setComfirmNumber(
                                this.inputCode(code, 0)
                            );
                        }}
                        value={this.tempCode[0]}
                        style={styles.number}
                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => (this.secondInput = el)}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        onChangeText={code => {
                            this.props.setComfirmNumber(
                                this.inputCode(code, 1)
                            );
                        }}
                        value={this.tempCode[1]}
                        style={styles.number}
                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => (this.thirdInput = el)}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        onChangeText={code => {
                            this.props.setComfirmNumber(
                                this.inputCode(code, 2)
                            );
                        }}
                        value={this.tempCode[2]}
                        style={styles.number}
                    />
                </View>

                <View style={styles.number_wrap}>
                    <TextInput
                        defainRef={el => (this.fourthInput = el)}
                        keyboardType="phone-pad"
                        maxLength={1}
                        placeholder="X"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        onChangeText={code => {
                            this.props.setComfirmNumber(
                                this.inputCode(code, 3)
                            );
                        }}
                        value={this.tempCode[3]}
                        style={styles.number}
                    />
                </View>
            </View>
        );
    }
}

ConfirmInputBlock.propTypes = {
    confirm: PropTypes.array.isRequired,
};
