import initialState from './orderInitialState'

import {
    UPDATE_ORDER_STATE,
    DO_ORDER,
    FLUSH_ORDER,
    LOAD_DATA_ORDER,
    ADD_ITEM_ORDER,
    CHANGE_ITEM_ADDITION_ORDER,
    CLEAN_DRAFT_ORDER,
    ORDER_REQUEST,
    ORDER_ERROR
} from '../constAction.js'

export default function order(state = initialState, action) {
    let flush = {
        state: false,
        price: { total: 0 },
        desired_time: 15,
        draft: {},
        order: {},
        spinnerShow: false
    }

    switch (action.type) {
        case UPDATE_ORDER_STATE:
            if (state.order.id == action.payload.orderID) {
                return Object.assign({}, flush, state, {
                    order: { ...state.order, state: action.payload.state }
                })
            } else {
                return state
            }
        case DO_ORDER:
            return Object.assign({}, flush, state, action.payload, {
                spinnerShow: false
            })
        case FLUSH_ORDER:
            return Object.assign({}, flush)
        case LOAD_DATA_ORDER:
            return Object.assign({}, state)
        case ADD_ITEM_ORDER:
            return Object.assign({}, state, action.payload)
        case CHANGE_ITEM_ADDITION_ORDER:
            return Object.assign({}, state, action.payload)
        case CLEAN_DRAFT_ORDER:
            return Object.assign({}, state, action.payload)
        case ORDER_REQUEST:
            return Object.assign(
                {},
                state,
                { spinnerShow: true },
                { needUpdateFromServer: false }
            )
        case ORDER_ERROR:
            return Object.assign({}, state, { spinnerShow: false })
        default:
            return state
    }
}
