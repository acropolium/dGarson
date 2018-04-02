import React, { Component } from 'react';
import { Actions, Scene, Lightbox, Modal } from 'react-native-router-flux';
import Home from '../containers/homeContainer'
import Confirm from '../containers/confirmContainer'
import Companie from '../containers/companyContainer'
import Menu from '../containers/menuContainer'
import Order from '../containers/orderContainer'
import Location from '../containers/locationContainer'
import Popage from '../containers/dialogContainer'
import AboutUs from '../containers/aboutAsContainer';
import ModalPicker from '../containers/ModalPickerContainer';
import Loading from '../components/Loading'
import Spinner from '../components/Spinner'
import {
    root,
    modal,
    login,
    register,
    confirm,
    menu,
    order,
    location,
    dialog,
    timer,
    companies,
    about
} from './sceneConstant.js';

export default Actions.create(
    <Lightbox>
        <Scene key={root} hideNavBar hideTabBar >
            <Scene key={modal} component={Modal} />
            <Scene key={login} component={Loading} panHandlers={null} initial={true} direction="leftToRight" />
            <Scene key={register} component={Home} panHandlers={null} direction="leftToRight" />
            <Scene key={confirm} component={Confirm} panHandlers={null} direction="leftToRight" />
            <Scene key={menu} component={Menu} panHandlers={null} direction="leftToRight" />
            <Scene key={order} component={Order} panHandlers={null} direction="leftToRight" />
            <Scene key={location} component={Location} panHandlers={null} direction="vertical" />
            <Scene key={dialog} component={Popage} panHandlers={null} direction="vertical" />
            <Scene key={timer} component={ModalPicker} panHandlers={null} direction="vertical" />
            <Scene key={companies} component={Companie} panHandlers={null} direction="leftToRight" />
            <Scene key={about} component={AboutUs} panHandlers={null} direction="vertical" />
        </Scene>
    </Lightbox>
);