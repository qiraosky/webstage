import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import Top from './top'
import Left from './left'
import Content from './content'

const LayOut = (props) => {
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
export default LayOut;