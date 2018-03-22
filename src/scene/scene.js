import React, { Component } from 'react';
import { Actions, Scene, Lightbox, Modal } from 'react-native-router-flux';
import Home from '../conteiners/homeConteiner'
import Loading from '../components/Loading'
import Confirm from '../conteiners/confirmContainer'
import Companies from '../conteiners/companyConteiner'
import Menu from '../conteiners/menuConteiner'
import Order from '../conteiners/orderConteiner'
import Location from '../conteiners/locationConteiner'
import Popage from '../conteiners/dialogConteiner'
import Spinner from '../components/Spinner'
import AboutUs from '../conteiners/aboutAsConteiner';
import ModalPicker from '../conteiners/ModalPickerConteiner';

export default Actions.create(
    <Lightbox>
        <Scene key="root" hideNavBar hideTabBar >
            <Scene key="modal" component={Modal} />
            <Scene key="login" component={Loading} panHandlers={null} initial={true} direction="leftToRight" />
            <Scene key="register" component={Home} panHandlers={null} direction="leftToRight" />
            <Scene key="confirm" component={Confirm} panHandlers={null} direction="leftToRight" />
            <Scene key="menu" component={Menu} panHandlers={null} direction="leftToRight" />
            <Scene key="order" component={Order} panHandlers={null} direction="leftToRight" />
            <Scene key="location" component={Location} panHandlers={null} direction="vertical" />
            <Scene key="dialog" component={Popage} panHandlers={null} direction="vertical" />
            <Scene key="timer" component={ModalPicker} panHandlers={null} direction="vertical" />
            <Scene key="companies" component={Companies} panHandlers={null} direction="leftToRight" />
            <Scene key="about" component={AboutUs} panHandlers={null} direction="vertical" />
        </Scene>
    </Lightbox>
);