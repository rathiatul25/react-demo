import React, {Component} from 'react';
import {DataTable} from '../actions/index';
import {doLogout} from '../actions/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Tbl} from './tbl';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { makeData, Logo, Tips } from "../helpers/utils";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//import {authHeader} from '../helpers/auth-header'

const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {
        // You can retrieve your data however you want, in this case, we will just use some local data.
        let filteredData = rawData;

        // You can use the filters in your request, but you are responsible for applying them.
        if (filtered.length) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                    return (row[nextFilter.id] + "").includes(nextFilter.value);
                });
            }, filteredData);
        }
        // You can also use the sorting in your request, but again, you are responsible for applying it.
        const sortedData = _.orderBy(
            filteredData,
            sorted.map(sort => {
                return row => {
                    if (row[sort.id] === null || row[sort.id] === undefined) {
                        return -Infinity;
                    }
                    return typeof row[sort.id] === "string"
                        ? row[sort.id].toLowerCase()
                        : row[sort.id];
                };
            }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        // You must return an object containing the rows of the current page, and optionally the total pages number.
        const res = {
            rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
            pages: Math.ceil(filteredData.length / pageSize)
        };

        // Here we'll simulate a server response with 500ms of delay.
        setTimeout(() => resolve(res), 500);
    });
};

class ServerDataTable extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        //console.log(state);
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        /*requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        });*/
        //console.log(state.sorted);
        //let obj = { pagesize:state.pageSize,page:state.page, sorted:state.sorted,filtered:state.filtered}
        this.props.DataTable(state.pageSize,state.page,state.sorted,state.filtered, res => {
            //console.log(res)
                this.setState({
                    //data: res.rows,
                    //pages: res.pages,
                    loading: false
                });

            });
    }


    componentWillMount() {
        console.log('mount');
        const filtered = [];
        const sorted = [];
        this.props.DataTable(10,0,sorted,filtered,res => {
            this.setState({
                //data: res.rows,
                //pages: res.pages,
                loading: false
            });
        });
    }



    render() {

        const { data, pages, loading } = this.state;
        if(!this.props.users){
            //console.log(this.props.users)
            return <div>Loading...</div>
        }
        //console.log(this.props.users.id);
        return (
            <div>
                <ReactTable
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Email",
                            id: "email",
                            accessor: "email"
                        },
                        {
                            Header: "ID",
                            id: "id",
                            filterable: false,
                            accessor: "id"
                        },

                        {
                            Header: "Action",
                            id: "ids",
                            sortable:false,
                            filterable: false,
                            accessor: "id",
                            Cell: cellInfo => (
                                <Link className="scenarioDetailLink"
                                      to={`/post/${cellInfo.row.id}/edit`}
                                      >Edit</Link>
                            )
                        }

                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={this.props.users}
                    pages={ this.props.pages } // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
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
    return bindActionCreators({DataTable: DataTable, doLogout}, dispatch);
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        users: state.users.users,
        msg:state.msg,
        loggedIn:state.auth.loggedIn,
        login_error:state.auth.login_error,
        pages:state.users.pages
        //
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerDataTable);
//https://react-table.js.org/#/story/readme