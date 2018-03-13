import { Actions, ActionConst } from 'react-native-router-flux';
import HttpService from "../../services/httpService";
import { USER } from "../const";
import { request, success, failure } from "../dispatchTypes";

const api = new HttpService();

/*export const registerUserPhone = (data) => {
    return dispatch => {
        dispatch(request(USER.FETCHING_PHONE_ENTER));
        api.register(data).then(response => {
            dispatch(success(USER.SUCCESS_PHONE_ENTER, response));
        }).catch(err => {

        })
    }
};*/

export function getDataByKey(key, defaultValue = false) {
    return (dispatch, props) => {
        const { user } = props();

        if (user.hasOwnProperty(key)) {
            return user[key];
        } else {
            return defaultValue || null;
        }
    }
}

export function hasKey(key) {
    return (dispatch, props) => {
        return props().user.hasOwnProperty(key);
    }
}

export function loadData(new_state) {
    return (dispatch, props) => {
        dispatch({
            type: 'load_data',
            payload: new_state
        })
    }
}

export function changePage(new_state) {
    return (dispatch, props) => {

        

        dispatch({
            type: 'change_page',
            payload: new_state
        });

        const { user } = props();

        switch (user.state) {
            case 'init': Actions.register({ type: ActionConst.RESET }); break;
            case 'confirm': Actions.confirm({ type: ActionConst.RESET }); break;
            case 'companies': Actions.companies({ type: ActionConst.RESET }); break;
            case 'menu': Actions.menu(); break;
            case 'order': Actions.order({ type: ActionConst.RESET }); break;
            case 'location': Actions.location(); break;
            case 'timer': Actions.timer(); break;
            case 'dialog': Actions.dialog(); break;
            case 'about': Actions.about(); break;
            case 'previewOrder': Actions.order({ type: ActionConst.RESET }); break;
            default: Actions.register({ type: ActionConst.RESET }); break;
        }
    }
}