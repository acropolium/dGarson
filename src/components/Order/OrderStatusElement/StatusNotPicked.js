import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../services/translate.js'
import { Icon, Text, View } from '../../BaseComponents';
import Button from '../../../widgets/buttons/styledButton';

import styles from "../../../styles/components/order/StatusNotPickedStyle";

const StatusNotPicked = (props) => {
    return (

        <View style={styles.wrap}>
            <View style={styles.wrap_text}>
                <Text style={styles.text}>{I18n.t('not_picked_warning_message')}</Text>
            </View>
            <View style={styles.wrap_button}>
                <Button buttonBorder="#94979f" iconFamily="SimpleLineIcons" iconNameLeft="phone" backgroundColor="#2A2A32" style={styles.button} title={I18n.t('operator').toUpperCase()} onPress={() => { props.handleClickUrl('tel:' + props.companyPhone) }} />
            </View>
        </View>

    );
};

StatusNotPicked.propTypes = {
    handleClickUrl: PropTypes.func.isRequired,
   
};

export default StatusNotPicked;
