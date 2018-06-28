import React, {Component} from 'react';
import {PostList} from '../actions/index';
import {doLogout} from '../actions/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Tbl} from './tbl';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { makeData, Logo, Tips } from "../helpers/utils";
//import {authHeader} from '../helpers/auth-header'


class DataTable extends Component {

    constructor() {
        super();
        /*this.state = {
            data: makeData()
        };*/
    }


    componentWillMount() {
        //console.log(authHeader().user);
        this.props.PostList();
    }



    render() {
        //const { data } = this.state;
        if(!this.props.users){
            return <div>Loading...</div>
        }
        return (
            <div>
                <ReactTable
                    data={this.props.users}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "name"
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Email",
                                    accessor: "email"
                                }
                            ]
                        },

                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
                <Tips />
                <Logo />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({PostList: PostList, doLogout}, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
//https://react-table.js.org/#/story/readme