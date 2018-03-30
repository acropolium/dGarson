import initialState from './orderInitialState'

import {
    updateOrderState,
    doOrder,
    flushOrder,
    loadDataOrder,
    addItemOrder,
    changeItemAdditionOrder,
    cleanDraftOrder,
    orderRequest,
    ordeError
} from '../constAction.js';

export default function order(state = initialState, action) {

    let flush = {
        state: false,
        price: { total: 0 },
        desired_time: 15,
        draft: {},
        order: {},
        spinnerShow: false
    };

    switch (action.type) {
        case updateOrderState:
            if (state.order.id == action.payload.orderID) {
                return Object.assign({}, flush, state, { order: { ...state.order, state: action.payload.state } });
            } else {
                return state;
            }
        case doOrder:
            return Object.assign({}, flush, state, action.payload, { spinnerShow: false });
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
        case orderRequest:
            return Object.assign({}, state, { spinnerShow: true }, { needUpdateFromServer: false });
        case ordeError:
            return Object.assign({}, state, { spinnerShow: false });
        default:
            return state;
    }
}
