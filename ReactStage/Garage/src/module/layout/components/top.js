import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';
const { Header } = Layout;

 const Top = (props) => {
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="trigger"
                style = {{fontSize:'30px'}}
                type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={props.toggle}
            />
        </Header>
    ) 

};

export default Top;