import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Homepage from './Homepage';
import Navbar from './Navbar';

function App() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=7211be16e55aa4ed73d3e5ed5cc194fe`
                );
                setData(res.data);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [location]);

    return (
        <>
            <Navbar setLocation={setLocation} />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Homepage location={data} />}
                />
            </Switch>
        </>
    );
}

export default App;
