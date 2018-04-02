import React, { PropTypes, Component } from 'react'
import { ImageBackground } from 'react-native';
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
    }

    sendData = async () => {


        if (this.props.spinnerShow) {
            return;
        }

        let code = this.state.code.join('');
        let confirmData = { phone: this.props.phone, code: code };

        this.props.loginActions.sendConfirm(confirmData).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
        });
    };

    goBack = async () => {
        this.props.changePage('home');
    };

    setComfirmNumber = (code) => {

        this.setState({ code: code })
    }

    render() {

        return (
            <ImageBackground source={require('../media/backgrounds/splash.png')} style={styles.bg}>
                <Spinner show={this.props.spinnerShow} />
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

