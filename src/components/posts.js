import React, {Component} from 'react';
import {PostList,deletePost} from '../actions/index';
import {doLogout} from '../actions/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
//import {authHeader} from '../helpers/auth-header'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {toastr} from 'react-redux-toastr';

class PostsList extends Component {

    /*componentWillMount() {
        //console.log(this.props.loggedIn, 'will');
        if(this.props.loggedIn){

            this.props.history.push('/login');
        }
    }*/

    /*constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }*/


    onDeleteClick(id){
        const toastrMessageOptions = {
            timeOut: 3000,
            onShowComplete:()=>window.location.assign('/')
        }
        console.log(id);
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deletePost(id, () => {
                            toastr.success('Title', 'Record deleted', toastrMessageOptions)
                            //window.location.assign('/');

                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })

    }
    componentDidMount() {
        //console.log(authHeader().user);
        this.props.PostList();
    }

    renderPost() {
        //console.log(this.props.users);
        return _.map(this.props.users, (user) => {

            return (
                <li key={user.id}>
                    <Link to={`/post/${user.id}`}>{user.name} </Link> |
                    <Link to={`/post/${user.id}/edit`}>Edit</Link> |
                    <button onClick={this.onDeleteClick.bind(this, user.id)} >Delete</button>

                </li>
            )
        })

    }
    /*logout(){
        this.props.doLogout();
        this.props.history.push('/login');
    }*/
    render() {
        if(!this.props.users) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <p>
                    {this.props.login_error }

                </p>

                {this.props.msg.message}
                <Link to='post/new'>Add New</Link> | <Link to='calculator'>Calculator</Link> |
                <Link to='/datatable'>Client side Datatable</Link> | <Link to='/server-datatable'>Server side Datatable</Link>

                    <ul>{this.renderPost()}</ul>
            </div>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({PostList: PostList, doLogout,deletePost}, dispatch);
}

function mapStateToProps(state) {
    //console.log(state.auth.loggedIn);
    return {
        users: state.users.users,
        msg:state.msg,
        loggedIn:state.auth.loggedIn,
        login_error:state.auth.login_error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

//https://daveceddia.com/avoid-bind-when-passing-props/