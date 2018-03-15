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
//import * as routeService from "../services/routeService";

const orderService = new OrderApi();
const userService = new UserApi();

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};


        if (!Object.keys(this.props.menu.menu).length) {
            this.props.menuActions.getMenuFromStorage()
        }
        // userService.setProps(this.props);
        //orderService.setProps(this.props);

        //routeService.changePage("companies")
    }

    componentWillReceiveProps(nextProps) {



    }


    getMenuFromStorage = async (cacheUpdate = false) => {
        if (userService.has('read_from_storage') && userService.get('read_from_storage') == true) {
            userService.set({ read_from_storage: false }, false);
            cacheUpdate = true;
        }

        if (cacheUpdate == false) {
            this.props.spinnerActions.show();
        }

        let request = new api();

        request.setProps(this.props).menu(userService.get('company_info').id, 'get', false,
            false,
            async (response) => {
                if (response.hasOwnProperty('redirect')) {
                    let orderJson = response.json;

                    switch (response.status) {
                        case 302:
                            await userService.set({ order: orderJson });
                            orderService.set({ order: orderJson, state: orderJson.state }, false);
                            this.props.spinnerActions.hide();
                            await userService.changePage('order');

                            break;
                        case 401:
                            this.props.spinnerActions.hide();
                            await userService.changePage('init', { read_from_storage: true });
                            break
                    }
                } else {

                    let save_data = { company_info: response.company, company: response.company.id, menu: response.data || [] };
                    if (response.company.hasOwnProperty('locations') && response.company.locations.length > 0) {
                        save_data['location'] = response.company.locations[0].id;
                    } else {
                        save_data['location'] = false;
                    }

                    await userService.set(save_data);

                    if (cacheUpdate == false)
                        this.props.spinnerActions.hide();
                }

                await userService.saveLastUpdateMenu(userService.get('company_info').id);
            },
            (error) => {
                if (cacheUpdate == false)
                    this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
            });

    };




    aboutAs = () => {
        routeService.changePage("about", false);

    }

    componentDidMount() {
        /*if (userService.has('read_from_storage') && userService.get('read_from_storage') == true){
            this.getMenuFromStorage(true);
        }else if (!userService.has('menu')){
            this.getMenuFromStorage(true);
        }else if (userService.has('menu') && userService.get('menu').length==0){
            this.getMenuFromStorage(true);
        }*/
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
                        data={Object.values(this.props.menu.menu)} />
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
