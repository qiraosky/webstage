import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import { Button } from 'antd';


//action  
const changeTextAction1 = {
    type: 'TEXT_CLICK1'
}
const buttonClickAction1 = {
    type: 'BUTTON_CLICK1'
}

//映射Redux state到组件的属性  
function mapStateToProps(state) {
    console.log(state)
    return {
        text: state.reducer2.text
    }
} 

//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch) {
    return {
        onButtonClick1: () => dispatch(buttonClickAction1),
        onChangeText1: () => dispatch(changeTextAction1)
    }
}  


class HelloWorld2 extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return (
            <div>
                <DatePicker />
                <Button type="dashed" onClick={this.props.onButtonClick1}>Click Me</Button>
                <br/>
                {this.props.text}
            </div>
        )
    }
}


//连接组件  
const Forms1 = connect(mapStateToProps, mapDispatchToProps)(HelloWorld2) 

export default Forms1;