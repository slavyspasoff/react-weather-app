import React from 'react';
import moment from 'moment';

import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    margin: '0.5rem',
    flex: 1,
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
  const cloudiness =
    (daily.clouds < 20 && 'Sunny') ||
    (daily.clouds < 50 && 'Partly Sunny') ||
    (daily.clouds < 70 && 'Mostly Cloudy') ||
    'Cloudy';
  const rainProbability =
    (daily.rain < 20 && 'Slight chance of raining') ||
    (daily.rain < 35 && 'Some change of rain') ||
    (daily.rain < 50 && 'Good change of rain') ||
    'High change of rain';

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
          {daily.temp.day.toFixed(1)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {daily.weather[0].description}
        </Typography>
        <Typography variant="body2" component="p">
          {cloudiness} with
        </Typography>
        <Typography variant="body2" component="p">
          {rainProbability}
        </Typography>
      </CardContent>
    </Card>
  );
}
