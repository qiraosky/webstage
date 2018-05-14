import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

const content = (props) => {
    return (
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {props.children}
        </Content>
    )
};

export default content;