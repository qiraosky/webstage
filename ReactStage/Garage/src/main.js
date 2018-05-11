import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import RouteMap from './config/route-map';
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
 


ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Router>
            <div>
                <RouteMap/>
            </div>
        </Router>
    </LocaleProvider>,
    document.getElementById('root')
);