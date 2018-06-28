import axios from 'axios';
import {authHeader} from '../helpers/auth-header';
import {toastr} from 'react-redux-toastr';
export const FETCH_POST = 'fetch_posts';
export const POST_SHOW = 'post_show';
export const POST_DELETE = 'post_delete';
export const CREATE_POST = 'create_post';
export const GET_COLORS = 'get_colors';
export const POST_EDIT = 'post_edit';
export const SUCCESS_MSG = 'success_msg';
export const LOGIN_ERROR = 'login_error';
export const FETCH_COUNTRY = 'fetch_country';
export const FETCH_STATE = 'fetch_state';
export const CHECK_EMAIL = 'check_email';
export const GET_SUGGESTION = 'get_suggestion';

//const APP_URL = 'http://localhost/react/server/data.php';
//const BASE_URL = 'http://localhost/react/server/data.php';

const APP_URL = 'http://lara54.local.com/api';


export function PostList() {

    //console.log(authHeader().user);

    const request = axios.post(`${APP_URL}/user-list?token=${authHeader().user}`);
    //const request = axios.post(`${APP_URL}/user-list?token=${token}`);
    return (dispatch) => {

        request.then(({data}) => {
            //console.log(data)
            dispatch({
                type:FETCH_POST,
                payload:data
            });
            setTimeout(function(){
                dispatch({
                    type: SUCCESS_MSG,
                    payload: ''
                });
            },2000)

        }).catch((error)=>{
            console.log(error.response)
            dispatch({
                type:LOGIN_ERROR,
                payload:error.response
            })
            window.location.assign('/');

        });
    }
    /*return {
        type:FETCH_POST,
        payload:request
    }*/
}
export function DataTable(page_size,page,sorted,filtered,callback) {

    //console.log(page_size,page,sorted,filtered);
    let filters = {sorted,filtered}
console.log(sorted);
    const request = axios.post(`${APP_URL}/server-data-table/${page_size}/${page}?token=${authHeader().user}`, filters);
    //const request = axios.post(`${APP_URL}/server-data-table/${page_size}/${page}?token=${authHeader().user}`, filtered);

    return (dispatch) => {

        request.then(({data}) => {
            //console.log(data.users.slice(page_size * page, page_size * page + page_size))
            callback({
                rows: data.users.slice(page_size * page, page_size * page + page_size),
                pages: Math.ceil(data.pages / page_size)
            });
            dispatch({
                type:FETCH_POST,
                payload:data
            });

        }).catch((error)=>{

           console.log(error.response);
            //window.location.assign('/');

        });
    }

}

export function PostShow(id) {
    const request = axios.get(`${APP_URL}/get-user-detail/${id}?token=${authHeader().user}`);

    //redux thunk is using
    return (dispatch) => {
        request.then(({data}) => {
            dispatch({
                type:POST_SHOW,
                payload:data
            });
        }).catch((error)=>{
            dispatch({
                type:LOGIN_ERROR,
                payload:error.response.data.error
            })
            window.location.assign('/');
        });
    }
    /*return {
        type:POST_SHOW,
        payload:request
    }*/

}

export function PostEdit(id, callback) {
    const request = axios.get(`${APP_URL}/get-user-detail/${id}?token=${authHeader().user}`);

    //redux thunk is using
    return (dispatch) => {
        request.then(({data}) => {
            callback(data);
            dispatch({
                type:POST_EDIT,
                payload:data
            });
        }).catch((error)=>{
            dispatch({
                type:LOGIN_ERROR,
                payload:error.response.data.error
            })
            window.location.assign('/');
            //console.log(error.response.data.error);
        });
    }
    /*return {
        type:POST_SHOW,
        payload:request
    }*/

}

export function deletePost(id, callBack) {
    const request = axios.post(`${APP_URL}/delete-user/${id}`).then(() => callBack());
    return (dispatch) => {
        request.then(() => {
            dispatch({
                type:POST_DELETE,
                payload:id
            });
            //toastr.success('Title', 'Message')
        });
    }

    /*return {
        type:POST_DELETE,
        payload:id
    }*/
}
//https://www.sitepoint.com/crud-app-react-redux-feathersjs/
export function createPost(values, callBack) {
    /*const request = axios.post(`${APP_URL}`, values).then(() => callBack());
    return {
        type:CREATE_POST,
        payload:request
    }*/
    const request = axios.post(`${APP_URL}/save-user?token=${authHeader().user}`, values);
    return (dispatch) => {
        request.then(
            (data) => {

                callBack(data);
                if(data.data.status === 1) {
                    dispatch({
                        type: SUCCESS_MSG,
                        payload: data.data.message
                    });
                }

            }).catch((error) => {
                /*dispatch({
                    type:LOGIN_ERROR,
                    payload:error.response.data.error
                })
                window.location.assign('/');*/
                console.log(error.response);
            });
    }

}
export function updatePost(id, values, callBack) {
    //const config = {headers: {'content-type': 'multipart/form-data'}}
    const request = axios.post(`${APP_URL}/update-user/${id}`, values);
    return (dispatch) => {
        request.then(

            (data) => {

                callBack(data);
                if(data.data.status === 1) {
                    dispatch({
                        type: SUCCESS_MSG,
                        payload: data.data.message
                    });
                }
                //console.log(data);
            }).catch(function (error) {
            callBack(error.response);
        });
    }

}

export function getColors(callback) {
    const request = axios.get(`${APP_URL}/get-colors`);

    return (dispatch) => {
        request.then(({data}) => {
            callback(data);
            dispatch({
                type:GET_COLORS,
                payload:data
            });
        });
    }

}

export function getCountry(callback) {

    const request = axios.get(`${APP_URL}/get-countries?token=${authHeader().user}`);

    return (dispatch) => {

        request.then(({data}) => {
            callback(data);
            dispatch({
                type:FETCH_COUNTRY,
                payload:data
            });


        }).catch((error)=>{
            console.log(error.response)
        });
    }

}

export function getState(country_id, callback) {
    const request = axios.get(`${APP_URL}/get-states/${country_id}`);
    return (dispatch) => {

        request.then(({data}) => {
            callback(data);
            dispatch({
                type:FETCH_STATE,
                payload:data
            });
        }).catch((error)=>{
            console.log(error.response)
        });
    }
}

export function checkEmail(email, callback) {
    const request = axios.post(`${APP_URL}/check-email/${email}`);
    return (dispatch) =>{
        request.then((data)=> {
            callback(data);
            dispatch({
               type:CHECK_EMAIL,
               payload:data
            });
        }).catch((error) => {
            console.log(error.response);
        })
    }

}

export function getSuggestionsValue(suggestion, callback) {
    const request = axios.post(`${APP_URL}/get-suggestions/${suggestion}`);
    return (dispatch) =>{
        request.then(({data})=> {
            callback(data);
            dispatch({
                type:GET_SUGGESTION,
                payload:data.items
            });
        }).catch((error) => {
            console.log(error.response);
        })
    }

}