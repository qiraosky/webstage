import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';
const { Header } = Layout;
import './top.css'


 const Top = (props) => {;
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <div className="">
            <Icon
                className="trigger toggel_button"
                style = {{fontSize:'20px',width:'70px',paddingTop:'20px'}}
                type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={props.toggle}
            />
            </div>
        </Header>
    ) 

};

export default Top;