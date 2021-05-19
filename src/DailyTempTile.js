import React from 'react';
import moment from 'moment';

import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flex: 1,
        textAlign: 'center',
        margin: '0.5rem',
        // backgroundColor: '#508999',
        // color: 'white',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function DailyTempTile({ daily }) {
    const classes = useStyles();
    // return (
    //     <div className={classes.root}>
    //         <h3>{(daily.temp.day - 273).toFixed(1)} C</h3>
    //         <h3>{daily.weather[0].description}</h3>
    //         <h3>{moment(daily.dt * 1000).format('DD/MM')}</h3>
    //         <h3>{daily.rain} rain</h3>
    //         <h3>{daily.clouds}% cloudy</h3>
    //         <h3>{daily.humidity} humidity</h3>
    //     </div>
    // );
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {moment(daily.dt * 1000).format('DD/MM')}
                </Typography>
                <img
                    src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}.png`}
                />
                <Typography variant="h5" component="h2">
                    {(daily.temp.day - 273).toFixed(1)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {daily.weather[0].description}
                </Typography>
                <Typography variant="body2" component="p">
                    {daily.clouds}% cloudy
                </Typography>
            </CardContent>
        </Card>
    );
}
