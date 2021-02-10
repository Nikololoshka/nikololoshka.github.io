import React, {useEffect, useState} from "react";
import {getCalendars} from "../../api/StankinGoogleCalendarAPI"
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    },
    calendarCard: {
        padding: theme.spacing(2),
        textAlign: "center"
    }
}));

const StankinGoogleCalendarList = () => {

    const [calendars, setCalendars] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        getCalendars().then(data => {
            setCalendars(data)
        });
    });

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                {calendars.map(info =>
                    <Grid item xs={6} md={3} lg={2}>
                        <Card variant="outlined">
                            <CardActionArea className={classes.calendarCard} href={info.link} >
                                <Typography variant="subtitle1">
                                    {info.name}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default StankinGoogleCalendarList;
