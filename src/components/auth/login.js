import React, {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {doLogin} from "../../actions/user";

const required = value => (value ? undefined : 'Required')

class Login extends Component{

    componentDidMount(){
        if(this.props.loggedIn){
           this.props.history.push('/');
        }
    }

    renderField(field){
        const {meta: {touched, error}} = field;
        return (
            <div>
                {field.label}
                <input type={field.type} {...field.input} />
                {touched ? error : ''}
            </div>
        )
    }
    onSubmit(values){
        //console.log(values);

        this.props.doLogin(values, (res) => {
            //console.log(res)
            if(res.status === 401) {
                this.props.history.push('/login');
            }else{
                this.props.history.push('/');
            }
        });

    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                {this.props.message}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="email" type="text" label="Login" component={this.renderField} validate={[required]} />
                    <Field name="password" type="password" label="Password" component={this.renderField} validate={[required]} />
                    <button type="submit">Submit</button>
                    <Link to="/">Cancel</Link>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        message:state.auth.message,
        loggedIn:state.auth.loggedIn
    }
}

export default reduxForm({
    form:'loginform'
})(
    connect(mapStateToProps, {doLogin})(Login)
);