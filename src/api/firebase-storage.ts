import {initializeApp} from 'firebase/app';
import {getStorage, ref, getDownloadURL, listAll, getStream} from 'firebase/storage';
import {ICategoryItem, IScheduleItem} from 'types/schedule-types';
import axios from "axios";

const STORAGE_API_V1_ENTRY = "schedules-json/v1/api_entry.json"

const STORAGE_API_V0 = "schedules"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAx8TMmLYPIFxznsTu1oZQPgN8QLcvZhBg",
    authDomain: "stankinschedule.firebaseapp.com",
    databaseURL: "https://stankinschedule.firebaseio.com",
    projectId: "stankinschedule",
    storageBucket: "stankinschedule.appspot.com",
    messagingSenderId: "709328752287",
    appId: "1:709328752287:web:d2465e970bbcb3df59dcaa",
    measurementId: "G-BZ6F5T9ECX"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const apiEntry = ref(storage, STORAGE_API_V1_ENTRY);

export const getScheduleStorageURL = () => {
    return getDownloadURL(apiEntry);
}

export const getStorageV0Categories = async (): Promise<ICategoryItem[]> => {
    const root = ref(storage, STORAGE_API_V0);
    const response = await listAll(root);
    return response.prefixes.map(item => (
        {
            name: item.name,
            path: item.name,
            state: {
                schedules: null,
                loading: false,
                error: null
            }
        }
    ))
}

export const getStorageV0Category = async (category: string) => {
    const root = ref(storage, STORAGE_API_V0);
    const folder = ref(root, category);
    return getStream(folder);
}

export const getStorageV0Schedule = async (categoryPath: string, schedulePath: string) => {
    const root = ref(storage, STORAGE_API_V0);
    const folder = ref(root, categoryPath);
    const file = ref(folder, schedulePath);
    const fileURL = await getDownloadURL(file);

    const response = await axios({
        url: fileURL,
        method: 'GET',
        responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', schedulePath);
    document.body.appendChild(link);
    link.click();
}

export const getStorageV0Schedules = async (category: string): Promise<IScheduleItem[]> => {
    const root = ref(storage, STORAGE_API_V0)
    const folder = ref(root, category)
    const response = await listAll(folder);
    return response.items.map(item => ({name: extractScheduleName(item.name), path: item.name}));
}

const extractScheduleName = (filename: string): string => {
    const index = filename.lastIndexOf('.');
    if (index !== -1) {
        return filename.substring(0, index);
    }
    return filename;
}