import React from 'react'
import { Route, IndexRoute } from 'react-router-dom';

import Tablegrid from '../components/tablegrid';
import Forms from '../components/forms';
import Forms1 from '../components/forms1';
import LayOut from '../module/layout/components';
import HomePage from "../components/homepage";

class RouteMap extends React.Component {
    render() {
        return (
            <LayOut>
                    <div>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/Tablegrid" component={Tablegrid} />
                        <Route path="/Forms" component={Forms} />
                        <Route path="/Forms1" component={Forms1} />
                    </div>
            </LayOut>
        )
    }
}
export default RouteMap
