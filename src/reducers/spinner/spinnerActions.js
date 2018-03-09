import { Actions, ActionConst } from 'react-native-router-flux';

export function show(new_state) {
    return (dispatch, props) => {
        dispatch({
              type: 'spinnerShow',
              
        })
    }
}

export function hide() {
    return (dispatch, props) => {
        dispatch({
            type: 'spinnerHide',
            
        })
    }
}