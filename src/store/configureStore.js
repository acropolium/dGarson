import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'

function configureStore(initialState) {
    const devTools = composeWithDevTools({ realtime: true })

    const store = createStore(
        rootReducer,
        initialState,
        devTools(applyMiddleware(thunk))
    )

    return store
}

const store = configureStore()
export default store
