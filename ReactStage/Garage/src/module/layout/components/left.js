import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./left.css"


export default () => {
    return (
        <div className="layout_left">
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/Helloworld">Helloworld</Link></li>
                <li><Link to="/Helloworld2">Helloworld2</Link></li>
            </ul>
        </div>
    )

};