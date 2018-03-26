import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import cidReducers from './reducers/main.js'

const logger = createLogger()
const middleware = applyMiddleware(promise(), thunk,
                                logger
                                )

export default createStore(cidReducers, middleware)
