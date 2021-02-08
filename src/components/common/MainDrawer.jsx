import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import {NavLink} from "react-router-dom";
import PhoneAndroid from "@material-ui/icons/PhoneAndroid";
import HomeIcon from '@material-ui/icons/Home';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

const WebsiteDrawer = (props) => {

    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button
                              component={NavLink}
                              exact
                              to={props.links.home.path}
                              activeClassName={"Mui-selected"}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={props.links.home.name}/>
                    </ListItem>
                    <ListItem button
                              component={NavLink}
                              to={props.links.stankinschedule.path}
                              activeClassName={"Mui-selected"}>
                        <ListItemIcon>
                            <PhoneAndroid/>
                        </ListItemIcon>
                        <ListItemText
                            primary={props.links.stankinschedule.name}/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

export default WebsiteDrawer;
