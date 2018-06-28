import axios from 'axios';
import {authHeader} from '../helpers/auth-header'

export const DO_LOGIN = 'do_login';
export const LOGIN_FAIL = 'login_fail';
export const DO_LOGOUT = 'do_logout';

const APP_URL = 'http://lara54.local.com/api/login';


export function doLogin(values,callback) {
    const request = axios.post(APP_URL, values);

    return (dispatch) => {
        request.then(({data}) => {

            if(data.status === 401) {
                //console.log(data);
                dispatch({
                    type:LOGIN_FAIL,
                    payload:'Login Failed'
                })
                callback(data);
            }else {
                console.log(data.token);
                localStorage.setItem('user', data.token);
                //localStorage.setItem('user', JSON.stringify(data.token));
                dispatch({
                    type: DO_LOGIN,
                    payload: true
                    //payload: data.token
                })
                callback(data);

            }
            //if(data.token)
            //localStorage.setItem('user', JSON.stringify(user));
        }).catch(error => {
            //console.log(error.response);
        })
    }
}

export function doLogout2() {
    // remove user from local storage to log user out
        localStorage.removeItem('user');

        return {
            type: DO_LOGOUT,
            payload: false
        }
}

export function doLogout(callback) {
    // remove user from local storage to log user out
    const Logout_URL = `http://lara54.local.com/api/logout?token=${authHeader().user}`;
    const request = axios.post(Logout_URL);
    return (dispatch) => {
        request.then(({data}) => {
            //console.log(data);

            localStorage.removeItem('user');
            dispatch({
                type: DO_LOGOUT,
                payload: false
            })
            callback();
        }).catch(error=>{
            //console.log(error.response);
        })

    }
}