import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./content.css"


export default (props) => {
    return (
        <div className="layout_content">
            {props.children}
        </div>
    )

};