import initialState from './orderInitialState'

import {
    updateOrderState,
    doOrder,
    flushOrder,
    loadDataOrder,
    addItemOrder,
    changeItemAdditionOrder,
    cleanDraftOrder
} from '../constAction.js';

export default function order(state = initialState, action) {

    let flush = {
        state: false,
        price: { total: 0 },
        desired_time: 15,
        draft: {},
        order: {},
    };

    switch (action.type) {
        case updateOrderState:
            if (state.order.id == action.payload.orderID) {
                return Object.assign({}, flush, state, { order: { ...state.order, state: action.payload.state } });
            } else {
                return state;
            }
        case doOrder:
            return Object.assign({}, flush, state, action.payload);
        case flushOrder:
            return Object.assign({}, flush);
        case loadDataOrder:
            return Object.assign({}, state);
        case addItemOrder:
            return Object.assign({}, state, action.payload);
        case changeItemAdditionOrder:
            return Object.assign({}, state, action.payload);
        case cleanDraftOrder:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
