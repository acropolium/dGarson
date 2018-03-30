import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore'
import App from './containers/appContainer';


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