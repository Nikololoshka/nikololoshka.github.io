import React from "react";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {NavLink} from "react-router-dom";


const STATIC_PATH = process.env.PUBLIC_URL + "/img/stankinschedule"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    media: {
        height: 240,
        backgroundSize: "contain",
        backgroundColor: "#2478bd"
    },
}));


const Home = (props) => {

    const classes = useStyles()

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12} md={6}>
                <Card variant="outlined">
                    <CardActionArea component={NavLink} to={props.links.stankinschedule.path}>
                        <CardMedia
                            className={classes.media}
                            image={STATIC_PATH + "/app_overview.png"}
                            title="Stankin Schedule preview"
                            />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Stankin Schedule
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Приложение для студентов МГТУ "СТАНКИН", в котором можно: просматривать расписания,
                                смотреть оценки модульного журнала и читать новости университета.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Home;
