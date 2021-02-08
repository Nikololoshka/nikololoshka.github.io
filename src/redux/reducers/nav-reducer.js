
let initialState = {
    home: {
        name: "Главная",
        path: "/"
    },
    stankinschedule: {
        name: "Stankin Schedule",
        path: "/stankinschedule/overview"
    }
};

const navReducer = (state = initialState, action) => {
    return state;
};

export default navReducer;
