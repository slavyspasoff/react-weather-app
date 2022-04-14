import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Grid,
  Paper,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import matchCountry from './helpers/matchCountry.helper';
import styles from './styles/Navbar.styles';

const useStyles = styles;

export default function Navbar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  let inputTimer;
  let timerTime = 500;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=7211be16e55aa4ed73d3e5ed5cc194fe`,
          { cancelToken: source.token }
        );
        console.log('request made');
        setData(res.data);
      } catch (e) {
        setData([]);
      }
    };
    clearTimeout(inputTimer);

    if (search.length > 2) {
      inputTimer = setTimeout(() => {
        fetchData();
      }, timerTime);
    }
    return () => source.cancel();
  }, [search]);

  const searchResults = data.map((e) => (
    <Paper
      key={uuid()}
      className={classes.searchResult}
      onClick={(e) => {
        const res = matchCountry(e.target.innerHTML, data);
        props.setLocation(res);
        setSearch('');
        setData([]);
      }}
    >
      {e.name} ({e.state && `${e.state}, `}
      {e.country})
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            WeatherApp
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              className={classes.searchContainer}
            >
              {searchResults}
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
