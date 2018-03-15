import initialState from './orderInitialState'

export default function order(state = initialState, action) {
    switch (action.type) {
        case 'do_order':
            return Object.assign({}, initialState, state, action.payload);
        case 'flush':
            return Object.assign({}, initialState);
        case 'load_data':
            return Object.assign({}, state);
        case 'add_item':
            return Object.assign({}, state, action.payload);
        case 'change_item_addition':
            return Object.assign({}, state, action.payload);
        case 'clean_draft_order':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
