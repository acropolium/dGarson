import React, { Component } from 'react';
import HeaderBlock from './HeaderBlock';
import I18n from '../services/translate.js'
import api from '../services/apiService';
import UserApi from '../services/userService';
import OrderApi from '../services/orderService';
import { View } from './BaseComponents';
import RenderMenu from "./Menu/RenderMenu";
import RenderMenuFooter from "./Menu/RenderMenuFooter";
import LocationChooser from "./CustomComponents/LocationChooser";
import styles from '../styles/components/Menu/MenuStyles';
import * as routeService from "../services/routeService";

const orderService = new OrderApi();
const userService = new UserApi();

export default class Menu extends Component {
    constructor(props) {
        super(props);

    }


    aboutAs = () => {
        routeService.changePage("about", false);

    }

    render() {


        return (
            <View style={styles.menuContainer}>
                <View style={styles.menuHeaderContainer}>
                    <HeaderBlock aboutAs={this.aboutAs} company_info={this.props.company_info}
                        centerTitle={this.props.company_info.name} currentLocation={this.props.menu.location} backButton />
                </View>

                <View style={styles.menuItemsContainer}>
                    <RenderMenu removeOrderItem={this.props.removeOrderItem} addOrderItem={this.props.addOrderItem}
                        changeOrderItemAddition={this.props.changeOrderItemAddition} order_draft={this.props.order_draft}
                        data={Object.values(this.props.menu.menu || {})} />
                </View>

                <View style={styles.menuFooterContainer}>
                    <LocationChooser company_info={this.props.company_info} currentLocation={this.props.menu.location} />
                    <RenderMenuFooter setOrder={this.props.setOrder} company_id={this.props.menu.company}
                        total_price={this.props.total_price} order_draft={this.props.order_draft}
                        changePage={this.props.changePage} />
                </View>
            </View>
        )
    }
}
