import React, { Component } from 'react';
import { BackAndroid, AppState, } from 'react-native';
import { Actions, Router, Reducer } from 'react-native-router-flux';
import I18n from '../services/translate.js'
import FCM, { FCMEvent } from 'react-native-fcm';
import scene from '../scene/scene.js'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
        this.props.appAction.loadInitialStateApp();

        FCM.on(FCMEvent.Notification, async (notification) => {

            this.props.appAction.notificationHandler(notification, this.props.dialogActions);
        });


        this.props.appAction.getToken();

        FCM.on(FCMEvent.RefreshToken, token => {

            this.props.appAction.sendToken(token);
        });
    };

    handleAndroidBack = async () => {
        const { dialogActions } = this.props;

        let currentAction = false;
        switch (this.currentPage) {
            case 'confirm':
                await this.props.changePage('init');
                currentAction = true;
                break;
            case 'location':
                Actions.pop();
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
                await this.props.changePage('menu');
                currentAction = true;
                break;
            case 'menu':

                await this.props.changePage('companies');
                currentAction = true;
                break;
            case 'order':
                let newState = 'companies';
                currentAction = true;

                if (['draft', 'cancel', 'payed'].indexOf(this.props.order_state) !== -1) {

                    newState = 'menu';
                }
                this.props.changePage(newState);

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