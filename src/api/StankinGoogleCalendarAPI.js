import * as axios from "axios";

const API_URL = "https://raw.githubusercontent.com/Nikololoshka/StankinGoogleCalendar/master/api_export.json"

export const getCalendars = () => {
    return axios.get(API_URL)
        .then(response => {
            return response.data
        });
}