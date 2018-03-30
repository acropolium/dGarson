import React, { Component } from 'react'
import HeaderBlock from './HeaderBlock';
import I18n from '../services/translate.js'
import { View } from './BaseComponents';
import SearchBlock from "./Companies/SearchBlock";
import CompanyList from "./Companies/CompanyList";
import styles from "../styles/components/CompaniesStyle";
import Spinner from "./Spinner";



export default class Companies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showClear: false,
            searchValue: '',
        };

         this.getItemsFromStorage();
    }

    componentWillReceiveProps(nextProps) {
       
        
        if (nextProps.needUpdate) {
            this.getItemsFromStorage(nextProps.needUpdateFromServer);
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
    };

    companiesList = (value) => {

        let list = Object.values(this.props.companies);

        if (value != '') {
            let patt = new RegExp(value, "gi");

            list = list.filter(function (item) {
                return item.name.match(patt);
            });
        }

        return list;
    };

    getItemsFromStorage = (readFromServer = false) => {

        this.props.companiesActions.getItemsFromStorage(readFromServer).catch((error) => {
            this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
        });
    };

    render() {

        return (
            <View style={styles.bg}>
                <Spinner show={this.props.spinnerShow} />
                <HeaderBlock centerTitle={I18n.t("companies_title")} hideRightBlock={true} />

                <CompanyList getCompanyMenu={this.props.getCompanyMenu}
                    data={this.companiesList(this.state.searchValue)}
                    onRefresh={() => this.getItemsFromStorage(true)}
                    dialogActions={this.props.dialogActions}
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
