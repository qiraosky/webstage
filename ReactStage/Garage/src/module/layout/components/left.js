import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./left.css"


 const Left = () => {
    return (
        <div className="layout_left">
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/Tablegrid">Tablegrid</Link></li>
                <li><Link to="/Forms">Forms</Link></li>
            </ul>
        </div>
    )

};

export default Left;