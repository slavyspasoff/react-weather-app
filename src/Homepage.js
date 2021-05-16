import React from 'react';
import { makeStyles } from '@material-ui/styles';

import LineGraph from './LineGraph';

const useStyles = makeStyles({
    chartContainer: {
        height: '25rem',
        width: '100%',
    },
});

export default function Homepage(props) {
    const { data, location } = props;
    const hourlyData = data?.hourly || [];
    const classes = useStyles();
    return (
        <div>
            <h1 style={{ display: 'inline' }}>
                {data?.current?.temp &&
                    `The temperature in ${location.name}, ${
                        location.country
                    } is ${(data.current.temp - 273).toFixed(1)} C°`}
            </h1>
            {data && (
                <img
                    src={`http://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}.png`}
                    alt="none"
                />
            )}
            <div className={classes.chartContainer}>
                {hourlyData.length > 0 && <LineGraph hourlyData={hourlyData} />}
            </div>
        </div>
    );
}
