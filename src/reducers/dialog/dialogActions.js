export function dialogShow(new_state) {
    return (dispatch, props) => {
        dispatch({
              type: 'show',
              payload: new_state
        })
    }
}

export function dialogHide() {
    return (dispatch, props) => {
        dispatch({
            type: 'hide',
            
        })
    }
}