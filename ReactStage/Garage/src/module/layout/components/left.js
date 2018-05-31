import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import MyLogo from './logo';
import './left.css'
const { Sider } = Layout;


 const Left = (props) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={props.collapsed}
        >              
            <div className="logo" >
                <MyLogo collapsed= {props.collapsed}/>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="user" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/Tablegrid">
                            <Icon type="video-camera" />
                            <span>Tablegrid</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/Forms">
                            <Icon type="upload" />
                            <span>Forms</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/Forms1">
                            <Icon type="upload" />
                            <span>Forms1</span>
                        </Link>
                    </Menu.Item>

            </Menu>
        </Sider>
    )

};

export default Left;