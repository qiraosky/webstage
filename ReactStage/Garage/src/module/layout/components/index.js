import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import EsTop from './top'
import EsLeft from './left'
import EsContent from './content'


export default class EsLayOut extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout>
                <EsLeft collapsed={this.state.collapsed}/>
                <Layout>
                    <EsTop collapsed={this.state.collapsed} toggle={this.toggle} />
                    <EsContent>
                        {this.props.children}
                    </EsContent>
                </Layout>
            </Layout>
        );
    }
}