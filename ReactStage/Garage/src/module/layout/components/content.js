import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./content.css"


const content = (props) => {
    return (
        <div className="layout_content">
            {props.children}
        </div>
    )

};

export default content;