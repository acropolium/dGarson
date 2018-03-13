import store from '../utils/storage';

import I18n from './translate.js'
import api from './apiService';
import config from '../config';

import moment from 'moment';

const initialUserStateKeys = [
    'token',
    'state',
    'company',
    'location',
    'company_info',
    'phone',
    'verify_code',
    'device_token',
    'device_token_sent',
    'lang',
    'companies',
    'menu',
    'menus'
];


export default class userService {
    setProps(props, t = false) {
        this.props = props;

        if (t)
            console.log(props);

        return this;
    };

    changePage = async (page, props = false, save_to_storage = true) => {
        if (save_to_storage)
            await store.save('state', page);

        let data = { state: page };
        if (props)
            data = Object.assign({}, data, props);
           
        this.props.routerActions.changePage(data);
    };

    get = (key, defaultValue = false) => {
        return this.props.routerActions.getDataByKey(key, defaultValue);
    };

    has = (key) => {
        return this.props.routerActions.hasKey(key);
    };

    set = async (props = {}, save_to_storage = true) => {

        if (save_to_storage) {
            Object.keys(props).forEach(async key => {
                await store.save(key, props[key]);
            });
        }

        this.props.routerActions.loadData(props);
    };

    getCompanyesCount = () => {
        return Object.keys(this.get('companies')).length;
    };

    loadInitialState = async () => {
        let storageData = {};

        for (let i = 0; i < initialUserStateKeys.length; i++) {
            let key = initialUserStateKeys[i];

            let value = await store.get(key);

            if (typeof value !== "undefined" && value !== null) {
                storageData[key] = value;
            }

        }

        this.set(storageData, false);

       
    };

    checkUpdateCompanies = async (userId) => {
        let lastUpdate = await store.get('lastUpdatedCompanies');
        let nextUpdate = moment(lastUpdate).add(1, 'days').format();
        let dateNow = moment.utc().format();
        if (nextUpdate <= dateNow) {
            let requestCompanies = (new api()).setProps(this.props);

            await requestCompanies.companies('GET', false, false,
                async (response) => {
                    let companies = {};
                    response.data.forEach((item) => {
                        companies[item.id] = item;
                    });

                    await this.set({ companies: companies, read_from_server: false });
                },
                (error) => {
                    this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
                }
            );
            await this.saveLastUpdateCompanies();
        }

    };

    checkUpdateMenu = async (companyId) => {
        let lastUpdate = await store.get('lastUpdatedMenu_' + companyId);
        let nextUpdate = moment(lastUpdate).add(1, 'days').format();
        let dateNow = moment.utc().format();
        if (nextUpdate <= dateNow) {
            let request = (new api()).setProps(this.props);

            await request.menu(companyId, 'get', false,
                false,
                async (response) => {
                    let save_data = {
                        company_info: response.company,
                        company: response.company.id,
                        menu: response.data || [],
                        menus: this.props.user.menus,
                        read_from_server: false
                    };

                    save_data.menus[response.company.id] = response.data || [];

                    if (response.company.hasOwnProperty('locations') && response.company.locations.length > 0) {
                        save_data['location'] = response.company.locations[0].id;
                    } else {
                        save_data['location'] = false;
                    }
                    await this.set(save_data);
                },
                (error) => {
                    this.props.dialogActions.dialogShow({ title: I18n.t("server_error"), message: error.message });
                });
            await this.saveLastUpdateMenu(companyId);
        }
    };

    saveLastUpdateMenu = async (companyId) => {
        await store.save('lastUpdatedMenu_' + companyId, moment.utc().format());
    };

    saveLastUpdateCompanies = async () => {
        await store.save('lastUpdatedCompanies', moment.utc().format());
    };
}