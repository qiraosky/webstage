import React from 'react';
import ReactDOM from 'react-dom';
import './logo.css';

class MyLogo extends React.Component{

    constructor(props){
        super(props)
        
    }

    render(){
        console.log(this.props)
        return (
            <div>
            {
                this.props.collapsed && 
                <div className="logo_01 logo_container">
                        <img style={{ width: "80px",height:"50px"}} src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png" />
                </div>
            }
            {
                !this.props.collapsed &&
                <div className="logo_02 logo_container">
                        <img style={{ width: "150px", height: "50px" }} src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png"/>
                </div>
            }
            </div>
            
        )
    }
}
 
export default MyLogo;