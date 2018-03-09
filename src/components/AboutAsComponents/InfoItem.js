import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableHighlight, FlatList } from '../BaseComponents';
import styles from "../../styles/components/AboutUsStyle";
import I18n from '../../services/translate.js';

const InfoItem = (props) => {
    return (
        <View >

            <TouchableHighlight underlayColor='#ddd' onPress={props.pressLocation}>
                <View >
                    <Text numberOfLines={2} style={styles.textColor}>{I18n.t("address")} :<Text style={styles.link}> {props.item.address}</Text></Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='#ddd' onPress={props.pressTel}>
                <View >
                    <Text numberOfLines={2} style={styles.textColor}>{I18n.t("phone")} : <Text style={styles.link}>{props.item.phone}</Text></Text>
                </View>
            </TouchableHighlight>

            <View style={styles.wrapLine}>
                <View style={styles.line}></View>
            </View>

        </View>
    );
}

export default InfoItem;

InfoItem.propTypes = {

    //renderItem: PropTypes.func.isRequired,

};


