import { Actions } from 'react-native-router-flux'
import { DIALOG_SHOWING, DIALOG_HIDDING } from '../constAction.js'

const initialState = {
    show: false,
    message: '',
    type: 'info',
    title: '',
    callback: false,
    referer: false
}

export default function dialog(state = initialState, action) {
    switch (action.type) {
        case DIALOG_SHOWING:
            Actions.dialog()
            return Object.assign({}, state, action.payload, { show: true })
        case DIALOG_HIDDING:
            return Object.assign({}, initialState)
        default:
            return state
    }
}
