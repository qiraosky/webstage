import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


 const Top = () => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AppBar title="系统首页" />
        </MuiThemeProvider>
    )
};

export default Top;