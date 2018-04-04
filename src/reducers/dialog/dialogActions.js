import { DIALOG_SHOWING, DIALOG_HIDDING } from '../constAction.js';

export function dialogShow(new_state) {
    return (dispatch, props) => {
        dispatch({
            type: DIALOG_SHOWING,
            payload: new_state,
        });
    };
}

export function dialogHide() {
    return (dispatch, props) => {
        dispatch({
            type: DIALOG_HIDDING,
        });
    };
}
