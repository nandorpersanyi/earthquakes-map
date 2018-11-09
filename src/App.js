import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
    return(  
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Layout>  
    );
}

export default App;
