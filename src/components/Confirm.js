import React, { PropTypes, Component } from 'react'
import {
    TextInput,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
    Dimensions,
    Platform,
    ImageBackground,
} from 'react-native';

import config from '../config'
import Button from '../widgets/buttons/styledButton';
import {Text, View, Image, TouchableHighlight} from './BaseComponents';

import api from '../services/apiService';
import I18n from '../services/translate.js';
import styles from "../styles/components/ConfirmStyle";
import ConfirmInputBlock from "./ConfirmElement/ConfirmInputBlock";
import ConfirmButtonBlock from "./ConfirmElement/ConfirmButtonBlock";

import UserApi from '../services/userService';
const userService = new UserApi();


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            code1: '',
            code2: '',
            code3: '',
            code4: '',
        };

        this.orderPending = false;
        userService.setProps(this.props);
    }

    sendData = () => {
        this.props.spinnerActions.show();

        if (this.orderPending == true) {
            return;
        }

        this.orderPending = true;

        let request = (new api()).setProps(this.props);

        let code = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4;

        let data = { phone: userService.get('phone'), code: code };

        request.verify('POST', data,
            () => { this.orderPending = false; },
            async (response) => {
                let api_token = response.api_token;
                let data = {
                    token: api_token,
                    state: 'companies'
                };

                await userService.set(data);
                console.log("PROPS", this.props);
                let requestCompanies = (new api()).setProps(this.props);

                requestCompanies.companies('GET', false, false,
                    async (response) => {
                        this.props.spinnerActions.hide();
                        console.log("RESPONSE", response)
                        if (response.data.length == 1) {

                            let data = {
                                company_info: response.data[0],
                                company: response.data[0].id,
                            };

                            if (response.data[0].hasOwnProperty('locations')) {
                                data['location'] = response.data[0].locations[0].id;
                            }

                            await userService.set(data);
                            await userService.changePage('menu');
                        } else {

                            let companies = {};
                            response.data.forEach((item) => {
                                companies[item.id] = item;
                            });

                            let data = { companies: companies };
                            await userService.set(data);
                            await userService.changePage('companies');

                        }
                    }
                );


            },
            (error) => {
                this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
            }
        );

    };

    goBack = async () => {
        userService.changePage('home');
    };

    render() {
        return (
            <ImageBackground source={require('../media/backgrounds/splash.png')} style={styles.bg}>
                <View>
                    <View style={styles.wrap_text}>
                        <Text style={[styles.product_title]}>{I18n.t("product_title")}</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.wrap_text}>
                        <Text style={[styles.register_style, styles.custom_font]}>{I18n.t("verify_code").toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={[styles.content_block]}>

                        <ConfirmInputBlock confirm={this} />
                        <ConfirmButtonBlock goBack={this.goBack} sendData={this.sendData}/>
                        

                    </View>
                </View>
            </ImageBackground>

        )
    }
}

