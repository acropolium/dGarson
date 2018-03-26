import React, { PropTypes, Component } from 'react'
import {ImageBackground} from 'react-native';
import * as routeService from "../services/routeService";
import { Text, View } from './BaseComponents';
import I18n from '../services/translate.js';
import styles from "../styles/components/ConfirmStyle";
import ConfirmInputBlock from "./ConfirmElement/ConfirmInputBlock";
import ConfirmButtonBlock from "./ConfirmElement/ConfirmButtonBlock";
import Spinner from "./Spinner";


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: []
        };


        if (!this.props.phone) {
            this.props.loginActions.loadInitialStateConfirmAct();
        }
    }

    sendData = async () => {


        if (this.props.login.spinnerShow) {
            return;
        }

        let code = this.state.code.join('');
        let confirmData = { phone: this.props.login.phone, code: code };
        
        this.props.loginActions.sendConfirm({
            user: {
                lang: this.props.login.lang,
                token: this.props.login.token
            }
        }, confirmData).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
        });
    };

    goBack = async () => {
        routeService.changePage('home');
    };

    setComfirmNumber = (code) => {

        this.setState({ code: code })
    }

    render() {

        return (
            <ImageBackground source={require('../media/backgrounds/splash.png')} style={styles.bg}>
                <Spinner show={this.props.login.spinnerShow} />
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

                        <ConfirmInputBlock setComfirmNumber={this.setComfirmNumber} confirm={this.state.code.slice()} />
                        <ConfirmButtonBlock goBack={this.goBack} sendData={this.sendData} />

                    </View>
                </View>
            </ImageBackground>

        )
    }
}

