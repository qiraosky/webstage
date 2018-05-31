import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import RouteMap from './config/route-map';
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './root-reducer';


let store = createStore(rootReducer);  
ReactDOM.render(
    <Provider store={store}> 
        <LocaleProvider locale={zh_CN}>
            <Router>
                <div>
                    <RouteMap/>
                </div>
            </Router>
        </LocaleProvider>
    </Provider>,
    document.getElementById('root')
);