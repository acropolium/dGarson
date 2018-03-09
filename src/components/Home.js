import React, { PropTypes, Component } from 'react'
import {    
    TextInput,
    Platform,    
    StyleSheet,
    AsyncStorage,    
    ImageBackground,
    Dimensions,
    Animated,
    Easing,
    PixelRatio
} from 'react-native';
import Util from '../helpers/Util';
import I18n from '../services/translate.js'


import config from '../config'
import api from '../services/apiService';

import Button from '../widgets/buttons/styledButton';

import UserApi from '../services/userService';
import Spinner from "./Spinner";

import {Text, View, Image} from './BaseComponents';
import styles from "../styles/components/HomeStyles";

import InputBlock from './HomeComponents/InputBlock'
const userService = new UserApi();

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            animating: false,
            phone: '',
            phone1: '',
            phone2: '',
            product: {
                position: new Animated.ValueXY({ x: 0, y: 240 })
            },
            register: {
                visibility: new Animated.Value(0),
                position: new Animated.ValueXY({ x: 0, y: 120 })
            },

            form: {
                position: new Animated.ValueXY({ x: 0, y: windowHeight }),

                phone: {
                    visibility: new Animated.Value(0),
                    position: new Animated.ValueXY({ x: 0, y: 100 })
                },
                button: {
                    visibility: new Animated.Value(0),
                    position: new Animated.ValueXY({ x: 0, y: 110 })
                },
            }
        };

        this.orderPending = false;
        userService.setProps(this.props);
    }

    componentDidMount() {
        
        Animated.parallel([
            Animated.sequence([
                Animated.timing(this.state.product.position, {
                    duration: 200, // milliseconds
                   
                    toValue: { x: 0, y: 0 },
                }),
                Animated.timing(this.state.register.visibility, {
                    duration: 200, // milliseconds
                    toValue: 1,
                })
            ]),

            Animated.timing(this.state.form.position, {
                duration: 400, // milliseconds
                toValue: { x: 0, y: 0 },
            }),
            Animated.timing(this.state.register.position, {
                duration: 400, // milliseconds
                toValue: { x: 0, y: 0 },
            })
        ])
            .start(() => {
                Animated.parallel([
                   
                    Animated.timing(this.state.form.phone.position, {
                        duration: 400, // milliseconds
                        toValue: { x: 0, y: 0 },
                    }),
                    Animated.timing(this.state.form.phone.visibility, {
                        duration: 400, // milliseconds
                        toValue: 1,
                    }),
                ]).start();
            });
    };


    sendData = async () => {

        let phone = '380' + this.state.phone1 + this.state.phone2;

        if (phone.trim().length != 12) {
            return;
        }

        if (this.orderPending == true) {
            return;
        }

        this.orderPending = true;

        this.props.spinnerActions.show();

        let device_token = userService.get('device_token');

        let data = {
            phone: phone,
            device_token: device_token,
            platform: Platform.OS
        };
        let request = new api();
        request.setProps(this.props).register('POST', data,
            () => { this.orderPending = false; },
            async (response) => {

                let data = {
                    phone: phone,
                    device_token: device_token,
                    device_token_sent: true
                };

                this.props.spinnerActions.hide();
                await userService.set(data);
                await userService.changePage('confirm');


            },
            (error) => {
                this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
            });
    };

    render() {
        return (            
            <ImageBackground source={require('../media/backgrounds/splash.png')} style={styles.bg}>
                <View>
                    <View style={styles.wrap_view_text}>
                        <Animated.Text style={[styles.product_title, { transform: this.state.product.position.getTranslateTransform(), }]}>{I18n.t("product_title")}</Animated.Text>
                    </View>
                </View>

                <View>
                    <View style={styles.wrap_view_text}>
                        <Animated.Text style={[styles.register_style, styles.custom_font, { opacity: this.state.register.visibility, transform: this.state.register.position.getTranslateTransform() }]}>{I18n.t("register").toUpperCase()}</Animated.Text>
                    </View>
                </View>

                <Animated.View style={[styles.container, {transform :this.state.form.position.getTranslateTransform()} ]}>
                    <InputBlock animated={Animated} sendData={this.sendData} home={this} />
                </Animated.View>                
            </ImageBackground>            
        )
    }
}
