import {Actions} from 'react-native-router-flux';
const initialState = {
    show: false,
    message: '',
    type:'info',
    title:'',
    callback:false,
    referer:false
};

export default function dialog(state = initialState, action) {
    switch (action.type) {
        case 'show':
            Actions.dialog();
            return Object.assign({}, state,  action.payload, {show:true});
        case 'hide':
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
