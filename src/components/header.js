import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import {doLogout} from '../actions/user';
import {connect} from 'react-redux';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show_logout:false
        }

    }

    componentWillMount(){
        //console.log(this.props.loggedIn);
        //this.setState({show_logout: this.props.loggedIn});
    }

    logout(){
        this.props.doLogout(()=>{
            window.location.assign('/');
        });
    }

    render(){

        //console.log(this.state.show_logout);
        /*let btn;
        if(this.props.loggedIn){
             btn =  <button type="button" onClick={this.logout.bind(this)}>Logout</button>
        }*/
        //console.log(this.props.loggedIn);
        return(
            this.props.loggedIn ?
            <div>
                {/*{btn}*/}
                <LogoutButton onBtnClick={this.logout.bind(this)} />
                {/*<button type="button" onClick={this.logout.bind(this)}>Logout</button>*/}
            </div>
                : ''
        )
    }
}

function LogoutButton(props) {
        return (
            <button onClick={props.onBtnClick}>
                fun Logout
            </button>
        );
}

function mapStateToProps(state){
    
    //console.log(state);
    /*if(typeof state.auth.loggedIn != 'undefined'){
        //console.log('if');
        return {loggedIn: state.auth.loggedIn};
    } else {
        return {loggedIn: false};
    }*/
    return {loggedIn: state.auth.loggedIn};

}
export default connect(mapStateToProps, {doLogout})(Header);
