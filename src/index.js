import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import reducers from './reducers';

import Posts from './components/posts';
import DataTable from './components/data_table';
import ServerDataTable from './components/server_data_table';
import FetchPost from './components/post_show';
import PostNew from './components/post_new';
import UserAdd from './components/material/user_add';
import Login from './components/auth/login';
import Calculator from './components/calculator';
import { PrivateRoute } from './components/PrivateRoute';
import Header from './components/header';

//form
import CustomerAdd from './components/simple-form/add';

import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';
import ReduxToastr from 'react-redux-toastr'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                <Header />

                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/datatable" component={DataTable}></Route>
                    <Route path="/server-datatable" component={ServerDataTable}></Route>
                    <Route path="/test" component={MyAwesomeReactComponent}></Route>

                    <PrivateRoute path="/post/new" component={PostNew}></PrivateRoute>
                    <Route path="/calculator" component={Calculator}></Route>
                    <Route path="/post/:id/edit" component={PostNew}></Route>
                    <PrivateRoute path="/post/:id" component={FetchPost}></PrivateRoute>
                    <PrivateRoute path="/material/user-add" component={UserAdd}></PrivateRoute>
                    <Route path="/react-form/add" component={CustomerAdd}></Route>
                    <Route path="/react-form/:id/edit" component={CustomerAdd}></Route>

                    {/*<Route path="/post/:id" component={FetchPost}></Route>*/}
                    <PrivateRoute exact path="/" component={Posts} />
                    {/*<Route path="/" component={Posts}></Route>*/}
                </Switch>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar/>

            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
//http://www.aku.vn/idea
/*
ReactDOM.render(<App />, document.getElementById('root'));*/

//React sesssion
//http://www.thegreatcodeadventure.com/jwt-authentication-with-react-redux/
