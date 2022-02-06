import {Dispatch} from "redux";
import {
    CategoryAction,
    CategoryActionTypes,
    ScheduleStorageAction,
    ScheduleStorageActionTypes
} from "types/schedule-types";
import {getStorageV0Categories, getStorageV0Schedules} from "api/firebase-storage";

export const fetchScheduleStorage = () => {
    return async (dispatch: Dispatch<ScheduleStorageAction>) => {
        try {
            dispatch({
                type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_LOADING
            });


            let categories = await getStorageV0Categories();
            categories = categories.sort((a, b) => {
                const f = a.name.split(' ').pop() ?? null;
                const s = b.name.split(' ').pop() ?? null;

                if (f == null || s == null) {
                    return b.name.localeCompare(a.name);
                }

                const ft = Date.parse(f);
                const st = Date.parse(s);

                return st - ft;
            })

            dispatch({
                type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_SUCCESS,
                categories: categories,
            })

        } catch (e) {
            dispatch({
                type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_ERROR,
                error: "Не удалось загрузить хранилище расписаний"
            })
        }
    }
}

export const fetchCategorySchedules = (categoryName: string) => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORY_LOADING,
                name: categoryName
            })

            const schedules = await getStorageV0Schedules(categoryName);

            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS,
                name: categoryName,
                schedules: schedules
            })

        } catch (e) {
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORY_ERROR,
                name: categoryName,
                error: "Не удалось загрузить расписания для категории"
            })
        }
    }
}