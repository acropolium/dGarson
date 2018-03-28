import { Actions } from 'react-native-router-flux';
import {
    dialogShowing,
    dialogHiding
} from '../constAction.js';

const initialState = {
    show: false,
    message: '',
    type: 'info',
    title: '',
    callback: false,
    referer: false
};

export default function dialog(state = initialState, action) {
    switch (action.type) {
        case dialogShowing:
            Actions.dialog();
            return Object.assign({}, state, action.payload, { show: true });
        case dialogHiding:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
