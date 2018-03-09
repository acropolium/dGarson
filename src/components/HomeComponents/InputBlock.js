import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config';
import I18n from '../../services/translate.js'
import styles from "../../styles/components/HomeStyles";
import Button from '../../widgets/buttons/styledButton';
import { TextInput } from '../BaseComponents'


export default class InputBlock extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View style={styles.content_block}>
                <Animated.View animated={this.props.animated} style={[styles.phone_block, { opacity: this.props.home.state.form.phone.visibility, transform: this.props.home.state.form.phone.position.getTranslateTransform(), }]} >
                    <Text style={[styles.custom_font, styles.animated_text]}>+380 (</Text>
                    <TextInput
                        keyboardType="phone-pad" style={[styles.custom_font, styles.number1]}
                        autoFocus={true}                        
                        placeholder="XX"
                        blurOnSubmit={false}
                        onChangeText={(phone) => {
                            this.props.home.setState({ phone1: phone });

                            if (phone.length == 2)
                                this.sndInput.focus(); 
                        }}
                        value={this.props.home.state.phone1}
                        underlineColorAndroid="transparent"
                        maxLength={2}
                        defainRef={el => this.fstInput = el}

                    />
                    <Text style={[styles.custom_font, styles.animated_text]}>)</Text>
                    <TextInput style={[styles.custom_font, styles.number2]}
                        defainRef={el => this.sndInput = el}                        
                        keyboardType="phone-pad"                       
                        placeholder="XXXXXXX"
                        onChangeText={(phone) => {
                            this.props.home.setState({ phone2: phone });
                                
                            if (phone.length == 7) 		                                 
                                this.sndInput.blur(); 		
                            if (phone.length == 0) 		                            
                                this.fstInput.focus(); 
                        }}
                        underlineColorAndroid="transparent"
                        value={this.props.home.state.phone2}
                        maxLength={7}
                    />
                </Animated.View>
                <View style={styles.wrap_view_button}>
                    <View style={styles.wrap_button}>
                        <Button title={I18n.t("register_button").toUpperCase()} onPress={this.props.sendData} iconName="ios-arrow-round-forward" />
                    </View>
                </View>

            </View>
        );
    }
}

InputBlock.propTypes = {

    sendData: PropTypes.func.isRequired,
    home: PropTypes.object.isRequired,
    animated: PropTypes.object.isRequired,

}
