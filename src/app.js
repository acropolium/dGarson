import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import App from './containers/appContainer';
const store = configureStore();

export default class dGarson extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
};