import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { v4 as uuid } from 'uuid';
import DailyTempTile from './DailyTempTile';
import LineGraph from './LineGraph';

const useStyles = makeStyles({
  root: {
    height: '90vh',
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F5FB',
  },

  chartContainer: {
    height: '35%',
    width: '55%',
    flexBasis: '100%',
  },
});

export default function Homepage(props) {
  const { data, location } = props;
  console.log(data);
  const classes = useStyles();
  const dailyTiles =
    data &&
    data.daily.map((e) => {
      return <DailyTempTile daily={e} key={uuid()} />;
    });
  return (
    <div className={classes.root}>
      {data && dailyTiles}
      <div className={classes.chartContainer}>
        {data && <LineGraph data={data} location={location} />}
      </div>
    </div>
  );
}
