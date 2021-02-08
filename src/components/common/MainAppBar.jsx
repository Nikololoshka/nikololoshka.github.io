import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1
    },
    gitHubIcon: {
        color: "white"
    }
}));


const WebsiteAppBar = (props) => {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.title}>
                    Nikololoshka Github overview
                </Typography>
                <IconButton href="https://github.com/Nikololoshka" >
                    <GitHubIcon className={classes.gitHubIcon} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default WebsiteAppBar;
