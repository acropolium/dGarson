import React from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../../services/translate';
import {Text, View} from '../BaseComponents';
import  styles from "../../styles/components/companies/EmptyListStyle";

const EmptyList = () => {
    return(
        <View style={styles.view}>
            <Text>{i18n.t("companies_not_found")}</Text>
        </View>
    )
};

export default EmptyList;