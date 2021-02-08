import {combineReducers, createStore} from "redux";
import navReducer from "./reducers/nav-reducer";

let reducers = combineReducers({
    nav: navReducer
});

let store = createStore(reducers);
window.store = store;

export default store;
