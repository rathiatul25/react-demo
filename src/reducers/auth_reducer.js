import {DO_LOGIN,LOGIN_FAIL,DO_LOGOUT} from "../actions/user";
import {LOGIN_ERROR} from "../actions/index";

let user_token = localStorage.getItem('user');
const initialState = user_token ? { loggedIn: true, user:user_token } : {loggedIn: false};


export default function (state=initialState, action) {
    switch (action.type){
        case DO_LOGIN:

            return {...state, loggedIn: action.payload }
        case LOGIN_FAIL:
            return {
                loggedIn: false,
                message:action.payload
            }
        case DO_LOGOUT:

            return {...state, loggedIn: false}

        case LOGIN_ERROR:
            //console.log('error')
            localStorage.removeItem('user');
            return {...state, login_error:action.payload, loggedIn: false};
        default :

            return state;



    }
}