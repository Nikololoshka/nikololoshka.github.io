
let initialState = {
    home: {
        name: "Главная",
        path: "/"
    },
    stankinSchedule: {
        name: "Stankin Schedule",
        path: "/stankinschedule/overview"
    },
    stankinGoogleCalendarList: {
        name: "Calendars",
        path: "/stankin_google_calendar/list"
    }
};

const navReducer = (state = initialState, action) => {
    return state;
};

export default navReducer;
