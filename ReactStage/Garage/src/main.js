import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import RouteMap from './config/route-map';

ReactDOM.render(
        <Router>
            <RouteMap/>
        </Router>,
    document.getElementById('root')
);