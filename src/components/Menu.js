import React, { Component } from 'react';
import HeaderBlock from './HeaderBlock';
import I18n from '../services/translate.js'
import api from '../services/apiService';
import UserApi from '../services/userService';
import OrderApi from '../services/orderService';
import {View} from './BaseComponents';
import RenderMenu from "./Menu/RenderMenu";
import RenderMenuFooter from "./Menu/RenderMenuFooter";
import LocationChooser from "./CustomComponents/LocationChooser";
import styles from '../styles/components/Menu/MenuStyles';

const orderService = new OrderApi();
const userService = new UserApi();

export default class Menu extends Component {
    constructor(props) { 
        super(props);
        this.state = {};
        
        userService.setProps(this.props);
        orderService.setProps(this.props);
    }

    getMenuFromStorage = async (cacheUpdate = false) => {
        if (userService.has('read_from_storage') && userService.get('read_from_storage') == true){
            userService.set({read_from_storage:false}, false);
            cacheUpdate = true;
        }

        if (cacheUpdate == false){
            this.props.spinnerActions.show();
        }   

        let request = new api();

        request.setProps(this.props).menu(userService.get('company_info').id, 'get', false,
            false ,
            async (response) => {
                if (response.hasOwnProperty('redirect')){
                    let orderJson = response.json;

                    switch (response.status){
                        case 302:
                            await userService.set({order: orderJson});
                            orderService.set({order: orderJson, state:orderJson.state}, false);
                            this.props.spinnerActions.hide();
                            await userService.changePage('order');

                            break;
                        case 401:
                            this.props.spinnerActions.hide();
                            await userService.changePage('init', {read_from_storage:true});
                            break
                    }
                }else{

                    let save_data = {company_info: response.company, company:response.company.id, menu:response.data||[]};
                    if (response.company.hasOwnProperty('locations') && response.company.locations.length>0){
                        save_data['location'] = response.company.locations[0].id;
                    }else{
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
                this.props.dialogActions.dialogShow({ title:I18n.t("server_error"), message:error.message});
            });

    };

    aboutAs=()=>{
        userService.changePage("about",false,false);

    }

    componentDidMount() {
        if (userService.has('read_from_storage') && userService.get('read_from_storage') == true){
            this.getMenuFromStorage(true);
        }else if (!userService.has('menu')){
            this.getMenuFromStorage(true);
        }else if (userService.has('menu') && userService.get('menu').length==0){
            this.getMenuFromStorage(true);
        }
    }

    render() {        
        return (
            <View style={styles.menuContainer}>    
                <View style={styles.menuHeaderContainer}>
                    <HeaderBlock aboutAs={this.aboutAs} {...this.props} centerTitle={userService.get('company_info').name} backButton/>
                </View>            
                    
                <View style={styles.menuItemsContainer}>
                    <RenderMenu data={userService.get('menu')} {...this.props}/>
                </View>  
                    
                <View style={styles.menuFooterContainer}>
                    <LocationChooser {...this.props} />
                    <RenderMenuFooter {...this.props}/>
                </View>  
            </View>
        )
    }
}
