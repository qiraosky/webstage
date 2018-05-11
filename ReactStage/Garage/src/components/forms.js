import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';


function Forms(){
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <TextField
                    hintText="Hint Text"
                /><br />
                <br />
                <TextField
                    hintText="The hint text can be as long as you want, it will wrap."
                /><br />
                <TextField
                    id="text-field-default"
                    defaultValue="Default Value"
                /><br />
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Floating Label Text"
                /><br />
                <TextField
                    defaultValue="Default Value"
                    floatingLabelText="Floating Label Text"
                /><br />
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Fixed Floating Label Text"
                    floatingLabelFixed={true}
                /><br />
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                /><br />
 
            </div>
        </MuiThemeProvider>
    )
}

export default Forms;