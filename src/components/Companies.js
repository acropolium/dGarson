import React, { PropTypes, Component } from 'react'
import {
    StyleSheet,
    Platform,
    PixelRatio
} from 'react-native';
import config from '../config'

import HeaderBlock from './HeaderBlock';

import I18n from '../services/translate.js'

import api from '../services/apiService';
import { View } from './BaseComponents';
import UserApi from '../services/userService';
import SearchBlock from "./Companies/SearchBlock";
import CompanyList from "./Companies/CompanyList";
import styles from "../styles/components/CompaniesStyle";


const userService = new UserApi();

export default class Companies extends Component {

    constructor(props) {
        super(props);

        userService.setProps(this.props);
        this.state = {
            dataSource: Object.values(userService.get('companies')),
            showClear: false,
            searchValue: ''
        };
        this.getItemsFromStorage(true);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.user.hasOwnProperty('read_from_server') && nextProps.user.read_from_server === true) {
            userService.set({ read_from_server: false });
            this.getItemsFromStorage(false);
        } else if (nextProps.user.hasOwnProperty('read_from_storage') && nextProps.user.read_from_storage === true) {
            userService.set({ read_from_storage: false });
            this.getItemsFromStorage(true);
        }
    }


    clearSearch = () => {
        this.setState({ showClear: false, searchValue: '' });
        this.doSearch('');
    };

    doSearch = (value) => {
        if (value.length == 0) {
            this.setState({ showClear: false, searchValue: value });
        } else {
            this.setState({ showClear: true, searchValue: value });
        }
        this.companiesList(value);
    };


    companiesList = (value) => {

        let list = Object.values(userService.get('companies'));

        if (value != '') {
            let patt = new RegExp(value, "gi");

            list = list.filter(function (item) {
                return item.name.match(patt);
            });
        }


        this.setState({ dataSource: list });
    };

    getItemsFromStorage = async (manualUpdate = false) => {
        if (manualUpdate == false)
            this.props.spinnerActions.show();

        let requestCompanies = (new api()).setProps(this.props);

        requestCompanies.companies('GET', false, false,
            async (response) => {
                
                let companies = {};

                if (response.data){
                    response.data.forEach((item) => {
                        companies[item.id] = item;
                    });

                await userService.set({ companies: companies });
                await userService.saveLastUpdateCompanies();

                if (response.data.length == 1) {
                    let data = { company_info: response.data[0], company: response.data[0].id };

                    if (response.data[0].hasOwnProperty('locations') && response.data[0].locations[0]) {
                        data['location'] = response.data[0].locations[0].id;
                    } else {
                        data['location'] = false;
                    }

                    await userService.set(data);

                    this.props.spinnerActions.hide();
                    await userService.changePage('menu');
                } else {
                    if (manualUpdate == false)
                        this.props.spinnerActions.hide();
                }

                this.clearSearch();
            }else{
                await userService.changePage('home');

            }
            },
            (error) => {
                this.props.spinnerActions.hide();
                this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
            }
        );
    };



    render() {

        return (
            <View style={styles.bg}>
                <HeaderBlock  {...this.props} centerTitle={I18n.t("companies_title")} hideRightBlock={true} />
                <CompanyList {...this.props}
                    data={this.state.dataSource}
                    onRefresh={() => this.getItemsFromStorage(true)}
                />
                <SearchBlock
                    value={this.state.searchValue}
                    clearSearch={this.clearSearch}
                    doSearch={this.doSearch}
                    showClear={this.state.showClear}
                />
            </View>
        )
    }
}
