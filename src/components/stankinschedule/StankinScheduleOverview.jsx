import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Container, Typography, Grid} from "@material-ui/core";

const STATIC_PATH = process.env.PUBLIC_URL + "/img/stankinschedule"

const useStyles = makeStyles((theme) => ({
    descriptionBackground: {
        backgroundImage: "url(/img/stankinschedule/schedule-description.jpg)",
        backgroundSize: "cover",
        padding: theme.spacing(4, 0)
    },
    descriptionTitle: {
        paddingBottom: theme.spacing(4)
    },
    descriptionContent: {
        paddingBottom: theme.spacing(3)
    },
    badge: {
        padding: theme.spacing(1, 2, 0, 0),
        width: "160px"
    },
    descriptionContainer: {
        padding: theme.spacing(3)
    },
    preview: {
        padding: theme.spacing(3),
        width: "100%"
    }
}));

const WhiteTextTypography = withStyles({
    root: {
        color: "white"
    }
})(Typography);


const StankinScheduleOverview = () => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.descriptionBackground}>
                <Container maxWidth="lg">
                    <WhiteTextTypography variant="h3" className={classes.descriptionTitle}>
                        Stankin Schedule
                    </WhiteTextTypography>
                    <WhiteTextTypography variant="body1" className={classes.descriptionContent}>
                        Stankin Schedule - это приложение для студентов МГТУ "СТАНКИН", в котором можно:
                        просматривать расписания, смотреть оценки модульного журнала и читать новости университета.
                    </WhiteTextTypography>

                    <Grid container>
                        <Grid item>
                            <a href="https://play.google.com/store/apps/details?id=com.vereshchagin.nikolay.stankinschedule">
                                <img src={STATIC_PATH + "/google-play-badge.png"} className={classes.badge}
                                     alt={"Google play"}/>
                            </a>
                        </Grid>
                        <Grid item>
                            <a href="https://github.com/Nikololoshka/ProjectPepega">
                                <img src={STATIC_PATH + "/github-badge.png"} className={classes.badge} alt={"Github"}/>
                            </a>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container maxWidth="lg" className={classes.descriptionContainer}>
                <Typography variant="h4">
                    Особенности
                </Typography>
                <ul>
                    <li>Расписание (создание, просмотр)</li>
                    <li>Виджет с расписанием</li>
                    <li>Модульный журнал</li>
                    <li>Новости университета и деканата</li>
                </ul>
                <Typography variant="h4">
                    Скриншоты
                </Typography>
                <Grid container>
                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                        <Grid item xs={12} md={3}>
                            <img src={STATIC_PATH + "/preview/" + value + ".png"} className={classes.preview}
                                 alt={"Preview image " + value}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default StankinScheduleOverview;