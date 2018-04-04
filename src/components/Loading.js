import React, { PropTypes, Component } from 'react';
import {
    ImageBackground,
    Animated,
    Dimensions,
    Easing,
    Alert,
} from 'react-native';
import I18n from '../services/translate.js';
import { View } from './BaseComponents';
import styles from '../styles/screens/LoadingScreenSyle';
import store from '../utils/storage';
import * as routeService from '../services/routeService';
let windowHeight = Dimensions.get('window').height;

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            animating: true,
            phone: '',
            product_position: new Animated.ValueXY({ x: 0, y: 240 }),
            product_visibility: new Animated.Value(0),
            copyright_position: new Animated.ValueXY({
                x: 0,
                y: windowHeight - 50,
            }),
            copyright_visibility: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.copyright_position, {
                duration: 400, // milliseconds
                easing: Easing.in(Easing.linear),
                toValue: { x: 0, y: windowHeight - 90 },
            }),
            Animated.timing(this.state.copyright_visibility, {
                duration: 400, // milliseconds
                toValue: 1,
            }),
        ]).start(() => {
            Animated.timing(this.state.product_visibility, {
                duration: 400, // milliseconds
                toValue: 1,
            }).start(() => {
                let page = store.get('state');
                routeService.changePage(page ? page : 'init');
            });
        });
    }

    render() {
        return (
            <ImageBackground
                source={require('../media/backgrounds/splash.png')}
                style={styles.bg}>
                <View>
                    <View style={styles.wrap_animate}>
                        <Animated.Text
                            style={[
                                styles.product_title,
                                {
                                    opacity: this.state.product_visibility,
                                    transform: this.state.product_position.getTranslateTransform(),
                                },
                            ]}>
                            {I18n.t('product_title')}
                        </Animated.Text>
                    </View>
                </View>
                <View>
                    <View style={styles.wrap_animate}>
                        <Animated.Image
                            source={require('../media/backgrounds/company.png')}
                            style={{
                                opacity: this.state.copyright_visibility,
                                transform: this.state.copyright_position.getTranslateTransform(),
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
