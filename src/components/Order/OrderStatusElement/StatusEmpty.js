import React from 'react';
import { Text, View } from '../../BaseComponents';
import styles from '../../../styles/components/order/StatusEmptyStyle';

const StatusEmpty = props => {
    return (
        <View>
            <View style={styles.wrap}>
                <Text style={styles.text}> </Text>
            </View>
        </View>
    );
};

export default StatusEmpty;
