import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';

function App() {
    const [location, setLocation] = useState('');
    return (
        <>
            <Navbar setLocation={setLocation} />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Homepage location={location} />}
                />
            </Switch>
        </>
    );
}

export default App;
