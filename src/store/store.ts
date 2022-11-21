import {applyMiddleware, legacy_createStore} from 'redux';
import {rootReducer} from './reducers';
import thunk from "redux-thunk";


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

