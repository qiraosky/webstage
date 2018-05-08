import React from 'react'
import { Route, IndexRoute } from 'react-router-dom';

import Helloworld from '../components/helloworld';
import Helloworld2 from '../components/helloworld2';
import LayOut from '../module/layout/components';


class RouteMap extends React.Component {
    render() {
        return (
            <LayOut>
                    <div>
                        <Route exact path="/" component={Helloworld} />
                        <Route path="/Helloworld" component={Helloworld} />
                        <Route path="/Helloworld2" component={Helloworld2} />
                    </div>
            </LayOut>
        )
    }
}
export default RouteMap
