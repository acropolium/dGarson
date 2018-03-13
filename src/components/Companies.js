import React, { PropTypes, Component } from 'react'
import {
    StyleSheet,
    Platform,
    PixelRatio
} from 'react-native';
import config from '../config'

import HeaderBlock from './HeaderBlock';

import I18n from '../services/translate.js'
import * as routeService from "../services/routeService";
import api from '../services/apiService';
import { View } from './BaseComponents';
import UserApi from '../services/userService';
import SearchBlock from "./Companies/SearchBlock";
import CompanyList from "./Companies/CompanyList";
import styles from "../styles/components/CompaniesStyle";
import Spinner from "./Spinner";

const userService = new UserApi();

export default class Companies extends Component {

    constructor(props) {
        super(props);



        // userService.setProps(this.props);
        this.state = {
            //   dataSource: Object.values(userService.get('companies')),
            showClear: false,
            searchValue: ''
        };

        this.getItemsFromStorage();



    }

    componentWillReceiveProps(nextProps) {

        /* if (nextProps.user.hasOwnProperty('read_from_server') && nextProps.user.read_from_server === true) {
             userService.set({ read_from_server: false });
             this.getItemsFromStorage(false);
         } else if (nextProps.user.hasOwnProperty('read_from_storage') && nextProps.user.read_from_storage === true) {
             userService.set({ read_from_storage: false });
             this.getItemsFromStorage(true);
         }*/
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

    getItemsFromStorage = (readFromServer = false) => {
        this.props.companiesActions.getItemsFromStorage(readFromServer).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
        });
    };



    render() {

        return (
            <View style={styles.bg}>
                <HeaderBlock   centerTitle={I18n.t("companies_title")} hideRightBlock={true} />
                <Spinner show={this.props.companies.spinnerShow} />
                <CompanyList getCompanyMenu={this.props.getCompanyMenu}
                    data={Object.values(this.props.companies.companies)}
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
