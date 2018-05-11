import React, { Component, Children, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './left.css';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';


const MenuExampleSimple = () => (
    <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <List>
                    <Link to="/">
                        <ListItem primaryText="首页" leftIcon={<ContentInbox />} /> 
                    </Link>
                    <Link to="/Tablegrid">
                        <ListItem primaryText="Tablegrid" leftIcon={<ActionGrade />} />
                    </Link>
                    <Link to="/Forms">
                        <ListItem primaryText="Forms" leftIcon={<ContentSend />} />
                    </Link>
                    <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                </List>
                <Divider />
                <List>
                    <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                </List>
            </div>
        </MuiThemeProvider>
    </div>
);


 const Left = () => {
    return (
        <div className="layout_left">
            <MenuExampleSimple/>
        </div>
    )

};

export default Left;