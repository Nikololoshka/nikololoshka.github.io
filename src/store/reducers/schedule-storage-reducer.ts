import {
    CategoryAction,
    CategoryActionTypes, CategoryState,
    ScheduleStorageAction,
    ScheduleStorageActionTypes,
    ScheduleStorageState,
} from "types/schedule-types";


const initialScheduleStorageState: ScheduleStorageState = {
    categories: null,
    loading: false,
    error: null
}

export const scheduleStorageReducer = (
    state: ScheduleStorageState = initialScheduleStorageState,
    action: ScheduleStorageAction | CategoryAction
): ScheduleStorageState => {
    switch (action.type) {
        case ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_LOADING:
            return {...state, loading: true};
        case ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_SUCCESS:
            return {...state, loading: false, categories: action.categories};
        case ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_ERROR:
            return {...state, loading: false, error: action.error};
        case CategoryActionTypes.FETCH_CATEGORY_LOADING: {
            const categoryState = findCategoryState(state, action.name);
            if (categoryState != null) {
                categoryState.loading = true
                return {...state, categories: state.categories};
            }
            return state;
        }
        case CategoryActionTypes.FETCH_CATEGORY_SUCCESS: {
            const categoryState = findCategoryState(state, action.name);
            if (categoryState != null) {
                categoryState.schedules = action.schedules
                categoryState.loading = false
                return {...state, categories: state.categories};
            }
            return state;
        }
        case CategoryActionTypes.FETCH_CATEGORY_ERROR: {
            const categoryState = findCategoryState(state, action.name);
            if (categoryState != null) {
                categoryState.error = action.error
                categoryState.loading = false
                return {...state, categories: state.categories};
            }
            return state;
        }
        default:
            return state;
    }
}

const findCategoryState = (state: ScheduleStorageState, categoryName: string): CategoryState | null => {
    const oldCategories = state.categories;
    if (oldCategories != null) {
        const index = oldCategories?.findIndex(item => item.name === categoryName)
        if (index !== -1) {
            return oldCategories[index].state;
        }
    }
    return null;
}