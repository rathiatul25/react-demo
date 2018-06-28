case POST_EDIT:
    //console.log(action.payload.users.id);
    return {...state, [action.payload.users.id]:action.payload.users,members:action.payload.members };//redux thunk is using

import React,{Component} from 'react';
import {Field,reduxForm, FieldArray} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost, getColors, PostEdit, updatePost, getCountries, getStates} from "../actions/index";
import _ from 'lodash';
import {toastr} from 'react-redux-toastr';
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Editor start
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
//Editor end

//Include jquery
import $ from 'jquery';
window.$ = $;
//End jquery

const renderDemoField = (field) =>  {
    const {meta: {touched, error}} = field;

    return (
        <div>
            <label>{field.label}</label>
            <input type={field.type} {...field.input} />
            {touched ? error : ''}
        </div>
    );
}



class PostNew extends Component{

    constructor(props){
        super(props);
        this.state = {
            colors:{},
            success:'Record added',
            errors:{},
            hasCity:false,
            countries:{},
            states:{},
            file:null,
            model: 'Example text'
        }

        this.getCountryStates = this.getCountryStates.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);

    }

    handleModelChange(model) {
        //console.log(model);
        this.setState({
            model: model
        });
    }

    componentDidMount(){

        this.props.getColors((res) => {
            this.setState({colors:res});
        });
        if(this.props.match.params.id) {
            const {id} = this.props.match.params;

            this.props.PostEdit(id, res => {
                //console.log(res);
                if(this.props.match.params.id) {
                    this.props.getStates(res.users.country_id, res => {

                        this.setState({states:res});
                    });
                }
            });
        }


    }
    componentWillMount()
    {

        this.props.getCountries(res => {
            this.setState({countries:res});
        });

    }


    renderCountry(field) {
        const {meta: {touched, error}} = field;
        return(
            <div>
                <select {...field.input}>
                    <option value="">Select Country</option>
                    {
                        _.map(field.allcountries, (val,key) => {
                            return (
                                <option value={key} key={key}>{val}</option>
                            )
                        })
                    }
                </select>
                {touched ? error : ''}
            </div>
        );
    }

    getCountryStates(e){
        //console.log(e.target.value);
        if(e.target.value > 0) {
            this.props.getStates(e.target.value, res => {
                this.setState({states:res});
            });
        } else {
            this.setState({states:{}});
        }
    }

    renderState(field) {

        const {meta: {touched, error}} = field;
        return(
            <div>
                <select {...field.input}>
                    <option value="">Select State</option>
                    {
                        _.map(field.allstates, (val,key) => {
                            return (
                                <option value={key} key={key}>{val}</option>
                            )
                        })
                    }
                </select>
                {touched ? error : ''}
            </div>
        );
    }

    renderColorSelector(field) {
        const colors = field.allcolor;
        const {meta: {touched, error}} = field;
        return(
            <div>
                <select {...field.input}>
                    <option value="">Select a color...</option>
                    {
                        _.map(colors, (val,key) => {
                            return (
                                <option value={key} key={key}>{val}</option>
                            )
                        })
                    }
                </select>
                {touched ? error : ''}
            </div>
        );
    }


    renderGender(field){
        const {meta: {touched, error}} = field;
        return(
            <div>{touched ? error : ''}</div>
        );
    }
    showCity(){
        this.setState({hasCity:!this.state.hasCity});
    }
    renderField(field){
        //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        //const {meta} = field; //1
        const {meta: {touched, error}} = field;
        return(
            <div>
                <label>{field.label}</label>
                <input type={field.type} {...field.input} />
                {/*...field.input - get all event*/}
                {/*show error message*/}
                {/*{field.meta.touched ? field.meta.error : ''}*/}
                {/*{meta.touched ? meta.error : ''}*/} {/*1*/}
                {touched ? error : ''}

            </div>
        );
    }


    renderMembers ({ fields, meta: { error, submitFailed } }) {

        return(

            <ul>
                <li>
                    <button type="button" onClick={() => fields.push({})}>
                        Add Member
                    </button>

                    {submitFailed && error && <span>{error}</span>}
                </li>
                {fields.map((member, index) => (

                    <li key={index}>
                        <button
                            type="button"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        >delete</button>
                        <h4>Member #{index + 1} </h4>

                        <Field type="text"
                               label="Name"
                               name={`${member}.first_name`}
                               component={renderDemoField}
                        />
                        <Field type="text"
                               label="Name"
                               name={`${member}.last_name`}
                               component={renderDemoField}
                        />

                    </li>
                ))}
            </ul>
        )
    }

    onSubmit(values){
        values.description = this.state.model


        return false;
        if(this.props.match.params.id){
            const {id} = this.props.match.params;

            //const formData = new FormData();
            //formData.append('file', this.state.file);

            values.file = this.state.file;



            this.props.updatePost(id, values, (response) => {

                if(response.data.status === 0){

                    this.setState({errors:response.data.errors});
                }else{
                    //toastr.success('Success', 'User details updated successfully');
                    this.props.history.push('/');
                }
            })
        } else {

            this.props.createPost(values, (response) => {

                if(response.data.status === 1){

                    toastr.success('Success', response.data.message);
                    //toastr.success('Success', 'User created successfully');
                    this.props.history.push('/');

                }else{
                    this.setState({errors:response.data.errors});
                }
            })
        }

    }
    fileInput ({ input, resetKey }) {
        const {value, ...inputProps} = input
        return (
            <input {...inputProps} key={resetKey} type="file" onBlur={() => {}}/>
        )
    }
    handleChange (e) {
        this.setState({file:e.target.files[0]});
    }

    render(){

        const {handleSubmit} = this.props;
        let {name,email} = this.state.errors;
        const hasCityValue = this.state.hasCity;
        return(
            <div>
                <Link to='/'>List</Link><br /><br />


                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">

                    <FieldArray name="members" component={this.renderMembers} />
                    <Field name="file" component={this.fileInput} onChange={this.handleChange.bind(this)} />
                    <Field name="country_id" allcountries={this.state.countries} component={this.renderCountry} onChange={this.getCountryStates}/>
                    <Field name="state_id" allstates={this.state.states} component={this.renderState}/>

                    <Field type="text"
                           label="Name"
                           name="name"
                           component={this.renderField}
                    />{name}

                    <Field
                        type="text"
                        label="Email"
                        name="email"
                        component={this.renderField}
                    />{email}
                    <div>
                        Male <Field
                        label="Male"
                        type="radio"
                        value="Male"
                        name="gender"
                        component="input"
                    />
                        Female <Field
                        label="Female"
                        type="radio"
                        value="Female"
                        name="gender"
                        component="input"
                    />
                        {/*<Field name="gender2" component={this.renderError} />*/}
                        <Field name="gender" component={this.renderGender} />
                        {this.state.errors.gender}

                        <Field name="color" allcolor={this.state.colors} component={this.renderColorSelector}/>

                        {this.state.errors.color}
                        <div>
                            <Field name="status" id="status" component={this.renderField} type="checkbox"/>
                        </div>


                        <div>
                            <label htmlFor="hasEmail">Has City?</label>
                            <div>
                                <Field name="hasCity" id="hasCity" component={this.renderField} type="checkbox" onChange={this.showCity.bind(this)} />

                            </div>
                        </div>
                        {hasCityValue && (
                            <div>
                                <div>
                                    <Field type="text"
                                           label="city"
                                           name="city"
                                           component={this.renderField}
                                    />
                                </div>
                            </div>
                        )}
                        <div>

                            <FroalaEditor name="description" component={this.renderField} type="text"
                                          model={this.state.model}
                                          onModelChange={this.handleModelChange.bind(this)}
                            />

                        </div>
                    </div>

                    <button type="submit">Submit</button>
                    <Link to="/">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values){
    //console.log(values);
    const errors = {};
    if(!values.description){
        console.log('error')
    }

    if(!values.name){

        errors.name = 'Please enter name.';
    }
    if(!values.email){
        errors.email = 'Please enter email.';
    }
    if(!values.gender){
        errors.gender = 'Please select gender.';
    }
    if (!values.color) {
        errors.color = 'Please select color'
    }
    if(!values.status){
        errors.status = 'Please select status'
    }
    if (!values.members || !values.members.length) {
        errors.members = { _error: 'At least one member must be entered' }
    }else {
        const membersArrayErrors = []
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {}
            //console.log(member);
            if (!member || !member.first_name) {
                memberErrors.first_name = 'Required'
                membersArrayErrors[memberIndex] = memberErrors
            }
            if (!member || !member.last_name) {
                memberErrors.last_name = 'Required'
                membersArrayErrors[memberIndex] = memberErrors
            }

        })
        if (membersArrayErrors.length) {
            errors.members = membersArrayErrors
        }
    }



    return errors;
}
function mapStateToProps(state, ownProps) {

    let returnObj = {
        colors: state.drop_down.colors,
    }

    if(typeof state.posts[ownProps.match.params.id] !== 'undefined') {
        returnObj.initialValues = state.posts[ownProps.match.params.id];
        returnObj.initialValues.members = state.posts.members;
    }
    return returnObj;

}

/*
export default reduxForm({
    //validate,
    //enableReinitialize : true,
    form:'PostNewForm'
})(
    connect(mapStateToProps,{createPost, getColors, PostEdit})(PostNew)
);*/
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PostNew = reduxForm({

    validate,
    form: 'initializeFromState', // a unique identifier for this form

})(PostNew)

// You have to connect() to any reducers that you wish to connect to yourself
PostNew = connect(
    mapStateToProps,{createPost, getColors, PostEdit, updatePost, getCountries, getStates}
)(PostNew)

//export default PostNew


