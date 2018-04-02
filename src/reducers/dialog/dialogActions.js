import { dialogShowing, dialogHiding } from '../constAction.js'

export function dialogShow(new_state) {
    return (dispatch, props) => {
        dispatch({
            type: dialogShowing,
            payload: new_state
        })
    }
}

export function dialogHide() {
    return (dispatch, props) => {
        dispatch({
            type: dialogHiding
        })
    }
}
