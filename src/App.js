import React from "react";
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import MainAppBar from "./components/common/MainAppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Route} from "react-router-dom";

import StankinScheduleOverview from "./components/stankinschedule/StankinScheduleOverview";
import MainDrawerContainer from "./components/common/MainDrawerContainer";
import HomeContainer from "./components/home/HomeContainer";


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1
    },
}));


const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MainAppBar />
            <MainDrawerContainer />
            <main className={classes.content}>
                <Toolbar/>
                <div>
                    <Route exact path="/"
                           render={() => <HomeContainer/> } />
                    <Route exact path="/stankinschedule/overview"
                           render={() => <StankinScheduleOverview/>} />
                </div>
            </main>
        </div>
    );
}

export default App;
