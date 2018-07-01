import { createStore,applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers';
const logger = createLogger();

const store = createStore(
    rootReducer,// this the current state
    undefined,// this is the intial state
    applyMiddleware(logger)
);

export default store;