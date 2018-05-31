import { combineReducers } from 'redux';
import $ from 'jquery'

const reducer1 = (state = null, action) => {
    if (!state){
        console.log(`state is not a legal value ,state = ${state}`);
        $.ajax({
            type: "GET",
            async: false,
            url: "/api/user",
            data: "",
            success: function (msg) {
                state = msg
            }
        });
    }

    switch (action.type) {
        case 'TEXT_CLICK':
            return {
                text: state.text == 'Hello' ? 'world' : 'Hello'
            }
        case 'BUTTON_CLICK':
            let text = "Hello world";
            if ("Hello world" == state.text){
                text = "Hello"
            } else if ("Hello" == state.text){
                text = "world"
            }else{
                text = "Hello world"
            }
            return {
                text: text
            }
        default:
            return state;
    }
}



const reducer2 = (state = null, action) => {
    if (!state) {
        console.log(`state is not a legal value ,state = ${state}`);

        $.ajax({
            type: "GET",
            async: false,
            url: "/api/user",
            data: "",
            success: function (msg) {
                state = msg
            }
        });
    }

    switch (action.type) {
        case 'TEXT_CLICK1':
            return {
                text: state.text == 'Hello' ? 'world' : 'Hello'
            }
        case 'BUTTON_CLICK1':
            let text = "Hello world1";
            if ("Hello world1" == state.text) {
                text = "Hello1"
            } else if ("Hello1" == state.text) {
                text = "world1"
            } else {
                text = "Hello world1"
            }
            return {
                text: text
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    reducer1: reducer1,
    reducer2: reducer2
});

export default rootReducer;