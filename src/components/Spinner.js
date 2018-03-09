import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,    
    Modal,
    ActivityIndicator
} from 'react-native';
import { Text, View } from './BaseComponents';
import  styles from "../styles/components/SpinnerStyles";

export default class Spinner extends Component {

    constructor(props) {
        super(props);
    }

    render(){
       
        return (
            <View style={[styles.background]}>
                <ActivityIndicator
                    size='large'
                    style={styles.activiti_indicator}
                />               
            </View>
        )

    }


}

