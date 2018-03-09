import React, { Component } from 'react';

import {
    AppState,
    BackAndroid,
    Platform
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Actions, Scene, Router, Reducer, Modal, Lightbox } from 'react-native-router-flux';
import Home from './components/Home'
import Loading from './components/Loading'
import Confirm from './components/Confirm'
import Companies from './components/Companies'
import Menu from './components/Menu'
import Order from './components/Order'
import Location from './components/Location'
import Popage from './components/Popage'
import Spinner from './components/Spinner'
import FCMHelper from './helpers/FCMHelper';
import AboutUs from './components/AboutUs';

import ModalPicker from './widgets/modal-picker';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore'

import * as userActions from './reducers/user/userActions'
import * as orderActions from './reducers/order/orderActions'
import * as dialogActions from './reducers/dialog/dialogActions'
import * as spinnerActions from './reducers/spinner/spinnerActions'

import config from "./config"
import api from './services/apiService';
import I18n from './services/translate.js'

import UserApi from './services/userService';
import OrderApi from './services/orderService';
import FCM, { FCMEvent } from 'react-native-fcm';

const userService = new UserApi();
const orderService = new OrderApi();


const mapStateToProps = (state) => {
    return {
        order: state.order,
        user: state.user,
        dialog: state.dialog,
        spinner: state.spinner,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderActions: bindActionCreators(orderActions, dispatch),
        routerActions: bindActionCreators(userActions, dispatch),
        dialogActions: bindActionCreators(dialogActions, dispatch),
        spinnerActions: bindActionCreators(spinnerActions, dispatch),

    }
};


const myConnectedLoadingConponent = connect(mapStateToProps, mapDispatchToProps)(Loading);
const myConnectedHomeConponent = connect(mapStateToProps, mapDispatchToProps)(Home);
const myConnectedConfirmConponent = connect(mapStateToProps, mapDispatchToProps)(Confirm);
const myConnectedMenuConponent = connect(mapStateToProps, mapDispatchToProps)(Menu);
const myConnectedOrderConponent = connect(mapStateToProps, mapDispatchToProps)(Order);
const myConnectedLocationComponent = connect(mapStateToProps, mapDispatchToProps)(Location);
const myConnectedDialogComponent = connect(mapStateToProps, mapDispatchToProps)(Popage);
const myConnectedSpinnerComponent = connect(mapStateToProps, mapDispatchToProps)(Spinner);
const myConnectedTimerComponent = connect(mapStateToProps, mapDispatchToProps)(ModalPicker);
const myConnectedCompaniesConponent = connect(mapStateToProps, mapDispatchToProps)(Companies);
const myConnectedAboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs);

const scenes = Actions.create(
    <Lightbox>
        <Scene key="root" hideNavBar hideTabBar >
            <Scene key="modal" component={Modal} />
            <Scene key="login" component={myConnectedLoadingConponent} panHandlers={null} initial={true} direction="leftToRight" />
            <Scene key="register" component={myConnectedHomeConponent} panHandlers={null} direction="leftToRight" />
            <Scene key="confirm" component={myConnectedConfirmConponent} panHandlers={null} direction="leftToRight" />
            <Scene key="menu" component={myConnectedMenuConponent} panHandlers={null} direction="leftToRight" />
            <Scene key="order" component={myConnectedOrderConponent} panHandlers={null} direction="leftToRight" />
            <Scene key="location" component={myConnectedLocationComponent} panHandlers={null} direction="vertical" />
            <Scene key="dialog" component={myConnectedDialogComponent} panHandlers={null} direction="vertical" />
            <Scene key="timer" component={myConnectedTimerComponent} panHandlers={null} direction="vertical" />
            <Scene key="companies" component={myConnectedCompaniesConponent} panHandlers={null} direction="leftToRight" />
            <Scene key="about" component={myConnectedAboutUs} panHandlers={null} direction="vertical" />
        </Scene>
        <Scene key="spinner" overlay component={myConnectedSpinnerComponent} panHandlers={null} direction="fade" />
    </Lightbox>
);

const store = configureStore();

let globalAction = false;
let globalState = false;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backTimes: 0
        };

        userService.setProps(this.props);
        orderService.setProps(this.props);
        userService.set({ lang: I18n.locale });
    };


    componentDidMount() {
        let that = this;

        FCM.on(FCMEvent.Notification, async (notification) => {

            FCMHelper.notificationHandler(notification, orderService, userService, (data) => that.props.dialogActions.dialogShow(data))
        });
        FCMHelper.getToken().then(token => {
            FCMHelper.sendToken(token, userService, that);
        });

        FCM.on(FCMEvent.RefreshToken, token => {
            FCMHelper.sendToken(token, userService, that);
        });

        AppState.addEventListener('change', this.handleAppStateChange);
    };

    handleAppStateChange = (appState) => {
        if (appState === 'active') {
            const { orderActions, routerActions } = this.props;

            let read_from_server = orderService.get('order').state == 'draft' ? false : true;

            orderActions.setOrder({ read_from_server: read_from_server });
            routerActions.loadData({ read_from_server: read_from_server });

            userService.checkUpdateCompanies().then(() => {
                userService.checkUpdateMenu(userService.get('company_info').id);
            });

        }
    };

    handleAndroidBack = async () => {
        const { dialogActions } = this.props;

        let currentAction = false;
        let currentState = userService.get('state');

        if (globalAction.hasOwnProperty('scene')) {
            currentState = globalAction.scene.children[globalAction.scene.index].sceneKey;
        } else if (globalAction.hasOwnProperty('key')) {
            currentState = globalAction.key;
        }

        switch (currentState) {
            case 'confirm':
                await userService.changePage('init');
                currentAction = true;
                break;
            case 'location':
                Actions.pop();
                await userService.set({ state: 'menu' }, false);
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
                await userService.changePage('menu');
                currentAction = true;
                break;
            case 'menu':
                if (userService.getCompanyesCount() > 1) {
                    await userService.changePage('companies');
                    currentAction = true;
                } else {
                    currentAction = false;
                }
                break;
            case 'order':
                let pagePayload = false;
                let newState = 'menu';
                currentAction = true;

                if (orderService.get('order').state == 'draft'
                    || orderService.get('order').state == 'cancel'
                    || orderService.get('order').state == 'payed') {

                    switch (orderService.get('order').state) {
                        case 'cancel':
                        case 'payed':
                            pagePayload = { read_from_storage: true };
                            break;
                        case 'draft':

                            break;
                    }


                    await userService.changePage(newState, pagePayload);

                } else {
                    if (await userService.getCompanyesCount() > 1) {
                        newState = 'companies';
                        await userService.changePage(newState, pagePayload);
                    } else {
                        currentAction = false;
                    }
                }
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

    render() {
        return <Router scenes={scenes} backAndroidHandler={this.handleAndroidBack} />
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default class dGarson extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <ConnectedApp />
            </Provider>
        );
    }
};