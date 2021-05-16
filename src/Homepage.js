import React from 'react';
import { makeStyles } from '@material-ui/styles';

import LineGraph from './LineGraph';

const useStyles = makeStyles({
    root: {
        height: '90vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    chartContainer: {
        height: '20rem',
        width: '45%',
    },
});

export default function Homepage(props) {
    const { data, location } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.chartContainer}>
                {data && <LineGraph data={data} location={location} />}
            </div>
        </div>
    );
}
