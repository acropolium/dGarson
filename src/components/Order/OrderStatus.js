import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View, Icon, TouchableHighlight } from '../BaseComponents';
import styles from "../../styles/components/order/OrderStatusStyle";
import I18n from '../../services/translate.js';
import StatusDraft from './OrderStatusElement/StatusDraft';
import StatusNotDraft from './OrderStatusElement/StatusNotDraft';
import StatusReady from './OrderStatusElement/StatusReady';
import StatusPayed from './OrderStatusElement/StatusPayed';
import StatusEmpty from './OrderStatusElement/StatusEmpty';
import StatusNotPicked from './OrderStatusElement/StatusNotPicked';

import Button from '../../widgets/buttons/styledButton';
import UserApi from '../../services/userService';
const userService = new UserApi();

export default class OrderStatus extends React.Component {
    constructor(props) {
        super(props);
        userService.setProps(this.props);
    };

    getFormattedTime = (desired_time) => {
        let outStr = '';
        if (desired_time < 60) {
            outStr = desired_time + ' ' + I18n.t('min');
        } else {
            let hr = ~~(desired_time / 60).toString();
            let minutes = desired_time % 60;

            outStr = hr + ' ' + I18n.t('hour') + (minutes == 0 ? '' : (' ' + minutes + ' ' + I18n.t('min')));
        }
        return outStr
    };

    handleClickUrl = (link) => {
        Linking.canOpenURL(link).then(
            supported => {
                if (supported) {
                    Linking.openURL(link);

                } else {
                    console.log('Don\'t know how to open URI: ' + link);
                }
            });
    };

    
    getCurrentAddress() {

        let location = userService.get('company_info').address + ', ' + I18n.t("phone") + ':' + userService.get('company_info').phone;
        userService.get('company_info').locations.forEach(function (val) {
            if (val.id == userService.get('location')) {
                location = val.address + ', ' + I18n.t("phone") + ':' + val.phone;
            }
        });

        return location;
    }


    renderElement = {
        'draft': <StatusDraft orderService={this.props.orderService} getFormattedTime={this.getFormattedTime} />,
        'notpicked': <StatusNotPicked handleClickUrl={this.handleClickUrl} userService={userService} />,
        'ready': <StatusReady getCurrentAddress={this.getCurrentAddress} orderService={this.props.orderService} getFormattedTime={this.getFormattedTime} />,
        'payed': <StatusPayed goBack={this.props.goBack} orderService={this.props.orderService} />,
        'false': <StatusEmpty />,
        'default': <StatusNotDraft orderService={this.props.orderService} getFormattedTime={this.getFormattedTime} />
    };



    renderStatusElement = (orderState) => {
        let order = orderState == false ? 'false' : orderState;

        return this.renderElement[order] ? this.renderElement[order] : this.renderElement['default'];
    }


    render() {
        return this.renderStatusElement(this.props.orderState)
    }
};

OrderStatus.propTypes = {
    orderState: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.bool.isRequired

    ])


};



