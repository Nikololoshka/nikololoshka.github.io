import {combineReducers} from "redux";
import {scheduleStorageReducer} from "./schedule-storage-reducer";


export const rootReducer = combineReducers({
    scheduleStorage: scheduleStorageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
