import React, { Component } from 'react';
import { Actions, Scene, Lightbox, Modal } from 'react-native-router-flux';
import Home from '../containers/homeContainer';
import Confirm from '../containers/confirmContainer';
import Companie from '../containers/companyContainer';
import Menu from '../containers/menuContainer';
import Order from '../containers/orderContainer';
import Location from '../containers/locationContainer';
import Popage from '../containers/dialogContainer';
import AboutUs from '../containers/aboutAsContainer';
import ModalPicker from '../containers/ModalPickerContainer';
import Loading from '../components/Loading';
import Spinner from '../components/Spinner';
import {
    ROOT_SCENE,
    MODAL_SCENE,
    LOGIN_SCENE,
    REGISTER_SCENE,
    CONFIRM_SCENE,
    MENU_SCENE,
    ORDER_SCENE,
    LOCATION_SCENE,
    DIALOG_SCENE,
    TIMER_SCENE,
    COMPANIES_SCENE,
    ABOUT_SCENE,
} from './sceneConstant.js';

export default Actions.create(
    <Lightbox>
        <Scene key={ROOT_SCENE} hideNavBar hideTabBar>
            <Scene key={MODAL_SCENE} component={Modal} />
            <Scene
                key={LOGIN_SCENE}
                component={Loading}
                panHandlers={null}
                initial={true}
                direction="leftToRight"
            />
            <Scene
                key={REGISTER_SCENE}
                component={Home}
                panHandlers={null}
                direction="leftToRight"
            />
            <Scene
                key={CONFIRM_SCENE}
                component={Confirm}
                panHandlers={null}
                direction="leftToRight"
            />
            <Scene
                key={MENU_SCENE}
                component={Menu}
                panHandlers={null}
                direction="leftToRight"
            />
            <Scene
                key={ORDER_SCENE}
                component={Order}
                panHandlers={null}
                direction="leftToRight"
            />
            <Scene
                key={LOCATION_SCENE}
                component={Location}
                panHandlers={null}
                direction="vertical"
            />
            <Scene
                key={DIALOG_SCENE}
                component={Popage}
                panHandlers={null}
                direction="vertical"
            />
            <Scene
                key={TIMER_SCENE}
                component={ModalPicker}
                panHandlers={null}
                direction="vertical"
            />
            <Scene
                key={COMPANIES_SCENE}
                component={Companie}
                panHandlers={null}
                direction="leftToRight"
            />
            <Scene
                key={ABOUT_SCENE}
                component={AboutUs}
                panHandlers={null}
                direction="vertical"
            />
        </Scene>
    </Lightbox>
);
