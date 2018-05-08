import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import Top from './top'
import Left from './left'
import Content from './content'

export default (props) => {
    return (
        <div>
            <Top/>
            <Left/>
            <Content>
                { props.children }
            </Content>
        </div>
    )
}