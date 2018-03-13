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
    ScrollView
} from 'react-native';

import config from '../config'
import Button from '../widgets/buttons/styledButton';
import { Text, View, Image, TouchableHighlight, FlatList } from './BaseComponents';
import { Actions } from 'react-native-router-flux';
import api from '../services/apiService';
import I18n from '../services/translate.js';
import styles from "../styles/components/AboutUsStyle";
import ConfirmInputBlock from "./ConfirmElement/ConfirmInputBlock";
import ConfirmButtonBlock from "./ConfirmElement/ConfirmButtonBlock";
import HeaderBlock from './HeaderBlock';
import UserApi from '../services/userService';
import InfoItem from './AboutAsComponents/InfoItem';
const userService = new UserApi();

export default class Home extends Component {

    constructor(props) {
        super(props);
        userService.setProps(this.props);
        this.companyInfo = this.props.company_info
    }



    goBack = async () => {
        Actions.pop();

    };


    render() {

        let curImage = this.companyInfo.logo ? { uri: this.companyInfo.logo } : require('../media/elements/no_photo_company.png');

        return (

            < View style={styles.allWrap}>
                <Image source={curImage} style={styles.backGroundImg} />

                <HeaderBlock {...this.props} ref='header' backButton={this.goBack} centerTitle={I18n.t("aboutus_title")} />

                <View style={styles.wrap}>
                    <ScrollView>

                        <View style={styles.allWrap}>
                            <View style={styles.wrap_img}>
                                <Image style={styles.item_image}
                                    source={curImage}

                                />
                            </View>

                            <View >
                                <Text numberOfLines={2} style={[styles.textColor, styles.head]}>{this.companyInfo.name}</Text>
                            </View>

                            <FlatList
                                data={this.companyInfo.locations}
                                renderItem={(item) => <InfoItem
                                    pressTel={() => { { this.refs.header.handleClickUrl('tel:' + item.phone) } }}
                                    pressLocation={() => { this.refs.header.handleClickUrl('geo:' + this.refs.header.getCurrentCoordinates()) }}
                                    item={item} />}
                            />
                        </View>

                    </ScrollView>
                </View>


            </View>

        )
    }
}

