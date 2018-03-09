import {Actions} from 'react-native-router-flux';

const initialState = {
    state: false,
};

export default function dialog(state = initialState, action) {
    switch (action.type) {
        case 'spinnerShow':
            Actions.spinner();
            return Object.assign({}, {state:true});
        case 'spinnerHide':
            if (state.state == true){
                Actions.pop();
            }
            return Object.assign({}, {state:false});
        default:
            return state;
    }
}
