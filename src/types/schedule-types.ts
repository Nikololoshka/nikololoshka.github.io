export interface IScheduleItem {
    name: string;
    path: string;
}

export interface ICategoryItem {
    name: string;
    path: string;
    state: CategoryState;
}

// ------------------------------------------------------

export interface IScheduleVersion {
    path: string;
    date: string;
}

export interface IScheduleEntry {
    name: string;
    category: number;
    versions: IScheduleVersion[];
}

export interface IScheduleCategory {
    id: number;
    name: string;
    parent: number | null;
}

export interface IScheduleStorage {
    last_update: string;
    categories: IScheduleCategory[];
    schedules: IScheduleEntry[];
}

// ------------------------------------------------------

export interface ScheduleStorageState {
    categories: ICategoryItem[] | null;
    loading: boolean;
    error: null | string;
}

export interface CategoryState {
    schedules: IScheduleItem[] | null;
    loading: boolean;
    error: null | string;
}

// ------------------------------------------------------

export enum ScheduleStorageActionTypes {
    FETCH_SCHEDULE_STORAGE_LOADING = 'FETCH_SCHEDULE_STORAGE_LOADING',
    FETCH_SCHEDULE_STORAGE_SUCCESS = 'FETCH_SCHEDULE_STORAGE_SUCCESS',
    FETCH_SCHEDULE_STORAGE_ERROR = 'FETCH_SCHEDULE_STORAGE_ERROR'
}

interface FetchScheduleStorage {
    type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_LOADING;
}

interface FetchScheduleStorageSuccess {
    type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_SUCCESS;
    categories: ICategoryItem[];
}

interface FetchScheduleStorageError {
    type: ScheduleStorageActionTypes.FETCH_SCHEDULE_STORAGE_ERROR;
    error: string
}

export type ScheduleStorageAction = FetchScheduleStorage | FetchScheduleStorageSuccess | FetchScheduleStorageError

// ------------------------------------------------------

export enum CategoryActionTypes {
    FETCH_CATEGORY_LOADING = 'FETCH_CATEGORY_LOADING',
    FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR'
}

interface FetchCategory {
    type: CategoryActionTypes.FETCH_CATEGORY_LOADING;
    name: string;
}

interface FetchCategorySuccess {
    type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS;
    name: string;
    schedules: IScheduleItem[];
}

interface FetchCategoryError {
    type: CategoryActionTypes.FETCH_CATEGORY_ERROR;
    name: string;
    error: string
}

export type CategoryAction = FetchCategory | FetchCategorySuccess | FetchCategoryError