import React, { Component } from 'react';

import {
    AppState,
    BackAndroid,
    Platform
} from 'react-native';

import { Actions, Router, Reducer } from 'react-native-router-flux';

import FCMHelper from '../helpers/FCMHelper';


import config from "../config"
import api from '../services/apiService';
import I18n from '../services/translate.js'

import UserApi from '../services/userService';
import OrderApi from '../services/orderService';
import FCM, { FCMEvent } from 'react-native-fcm';
import scene from '../scene/scene.js'
import * as routeService from "../services/routeService";
const userService = new UserApi();
const orderService = new OrderApi();



export default class App extends Component {

    constructor(props) {
        super(props);

        /*this.state = {
            backTimes: 0
        };*/

        userService.setProps(this.props);
        orderService.setProps(this.props);
        //userService.set({ lang: I18n.locale });


    };


    componentDidMount() {
        let that = this;

        FCM.on(FCMEvent.Notification, async (notification) => {

            this.props.notificationHandler(notification)
        });
        FCMHelper.getToken().then(token => {
            
            FCMHelper.sendToken(token, userService, that);
        });

        
        FCM.on(FCMEvent.RefreshToken, token => {
            
            FCMHelper.sendToken(token, userService, that);
        });

      //  AppState.addEventListener('change', this.handleAppStateChange);
    };

   /* handleAppStateChange = (appState) => {
        if (appState === 'active') {
            const { orderActions, routerActions } = this.props;

            let read_from_server = orderService.get('order').state == 'draft' ? false : true;

            orderActions.setOrder({ read_from_server: read_from_server });
            routerActions.loadData({ read_from_server: read_from_server });

            userService.checkUpdateCompanies().then(() => {
                userService.checkUpdateMenu(userService.get('company_info').id);
            });

        }
    };*/



    handleAndroidBack = async () => {
        const { dialogActions } = this.props;
        /* alert(Actions.currentRouter())
         let currentAction = false;
         let currentState = userService.get('state');
 
         if (globalAction.hasOwnProperty('scene')) {
             currentState = globalAction.scene.children[globalAction.scene.index].sceneKey;
         } else if (globalAction.hasOwnProperty('key')) {
             currentState = globalAction.key;
         }*/
        let currentAction = false;
        switch (this.currentPage) {
            case 'confirm':
                await routeService.changePage('init');
                currentAction = true;
                break;
            case 'location':
                Actions.pop();
                //await userService.set({ state: 'menu' }, false);
                currentAction = true;
                break;
            case 'dialog':
            case 'timer':
                currentAction = true;
                Actions.pop();
                break;
            case 'about':
                Actions.pop();

                currentAction = true;
                break;

            case 'previewOrder':
                await routeService.changePage('menu');
                currentAction = true;
                break;
            case 'menu':

                await routeService.changePage('companies');
                currentAction = true;
                break;
            case 'order':
                // let pagePayload = false;
                let newState = 'companies';
                currentAction = true;

                if (this.props.order_state == 'draft'
                    || this.props.order_state == 'cancel'
                    || this.props.order_state == 'payed') {

                    /*    switch (orderService.get('order').state) {
                            case 'cancel':
                            case 'payed':
                                pagePayload = { read_from_storage: true };
                                break;
                            case 'draft':
    
                                break;
                        }*/

                    newState = 'menu';


                }
                routeService.changePage(newState);

                /*else {
                //if (await userService.getCompanyesCount() > 1) {
                    newState = 'companies';
                    await routeService.changePage(newState);
               // } else {
                 //   currentAction = false;
                //}
            }*/
                break;
        }

        if (currentAction == false) {

            dialogActions.dialogShow(
                {
                    type: 'confirm',
                    message: I18n.t("exit_confirm_message"),
                    callback: BackAndroid.exitApp,
                    ok_title: I18n.t("dialog_ok"),
                    cancel_title: I18n.t("dialog_cancel"),
                    ok_backgroundColor: '#e65048'
                }
            );
        }

        return true;
    };

    reducerCreate = params => {
        const defaultReducer = new Reducer(params);
        return (state, action) => {
            this.currentPage = action.routeName;


            return defaultReducer(state, action);
        };
    };



    render() {
        return <Router createReducer={this.reducerCreate} scenes={scene} backAndroidHandler={this.handleAndroidBack} />
    }
}