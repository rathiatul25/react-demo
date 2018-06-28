import React,{Component} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PostList, createPost, getColors, PostEdit, updatePost, getCountry} from "../../actions/index";
import _ from 'lodash';
import {toastr} from 'react-redux-toastr';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import validate from './validate';

//Auto suggest start
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 2012
    }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const renderMemberField = (field)=>{
    const {meta: {touched, error}} = field;
    return(
        <div>
            <label>{field.label}</label>
            <input type={field.type} {...field.input} />
            {touched ? error : ''}
        </div>
    );
}



class UserAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            colors:{},
            errors:{},
            photo:null,
            value: '',
            suggestions: [],
            dataSource: [],
        }
        //this.onFileSelect = this.onFileSelect.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    //Auto suggestion start
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };


    //Auto suggestion end
    componentDidMount(){
        /*if(!this.props.loggedIn){

            this.props.history.push('/login');
        }*/

        this.props.getColors((res) => {
            this.setState({colors:res});
        });
        if(this.props.match.params.id) {

            const {id} = this.props.match.params;
            this.props.PostEdit(id, (res)=>{

                //this.setState({data:res});
            });

        }
    }
    /*renderError = ({ meta: { touched, error } }) =>
    touched ? <span>{error}</span> : false;*/

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
    renderTextField({input,label,meta: { touched, error },...custom})
    {
        //console.log(custom)
        return(
            <div>
                <TextField
                    hintText={label}
                    floatingLabelText={label}
                    errorText={touched && error}
                    {...input}
                    {...custom}
                />
            </div>
        )
    }

    renderMembers({ fields, meta: { error, submitFailed } }) {
        return (
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
                        >Remove</button>
                        <h4>Member #{index + 1}</h4>
                        <Field
                            name={`${member}.first_name`}
                            type="text"
                            component={renderMemberField}
                            label="First Name"
                        />
                        <Field
                            name={`${member}.last_name`}
                            type="text"
                            component={renderMemberField}
                            label="Last Name"
                        />

                    </li>
                ))}
            </ul>
        )
    }


    onSubmit(values){

        if(this.props.match.params.id) {
            values.photo = this.state.photo;
            const id = this.props.match.params.id;
            this.props.updatePost(id, values, (response) => {
                if (response.data.status === 0) {
                    this.setState({errors: response.data.errors});
                } else {
                    toastr.success('Title', 'Message')
                    this.props.history.push('/');
                }
            })
        } else {
            this.props.createPost(values, (response) => {
                if (response.data.status === 0) {
                    this.setState({errors: response.data.errors});
                } else {
                    this.props.history.push('/');
                }
            })
        }
    }

    //https://codepen.io/hartzis/pen/VvNGZP
    //https://github.com/erikras/redux-form/issues/1143
    FileInput ({ input, resetKey }) {
        const { value, ...inputProps } = input
        return (
            <input {...inputProps} key={resetKey} type="file" onBlur={() => {}} />
        )
    }

    handleFileChange(e){
        //console.log(e.target.files[0]);
        this.setState({photo:e.target.files[0]});
    }

    render(){
        //console.log(this.props.colors);
        const {handleSubmit} = this.props;
        let {name,email} = this.state.errors;

        return(

            <div>


                <Link to='/'>List</Link><br /><br />
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
                    <div>
                        <MuiThemeProvider>
                            <Field
                                name="name"
                                component={this.renderTextField}
                                label="First Name"
                            />
                        </MuiThemeProvider>
                    </div>


                    <Field
                        type="text"
                        label="Email"
                        name="email"
                        component={this.renderField}
                    />
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
                            {/*<Field name="employed" id="employed" component="input" type="checkbox"/>*/}
                            <Field name="status" id="status" component={this.renderField} type="checkbox"/>

                        </div>

                        <Field name="photo" component={this.FileInput} onChange={this.handleFileChange} />
                    </div>
                    <div>
                        <FieldArray name="members" component={this.renderMembers} />
                    </div>

                    <button type="submit">Submit</button>
                    <Link to="/">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate2(values){
    //console.log(values.gender);
    const errors = {};
    if(!values.name){
        errors.name = 'Please enter name.';
    }
    if(!values.email){
        errors.email = 'Please enter email.';
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email.';
    }
    if(!values.gender){
        errors.gender = 'Please select gender.';
    }
    if (!values.color) {
        errors.color = 'Please select color'
    }
    if(!values.employee){
        errors.employee = 'Please select status'
    }

    if (!values.members || !values.members.length) {
        errors.members = { _error: 'At least one member must be entered' }
    } else {
        const membersArrayErrors = []
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {}
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

    //let return_val= {initialValues:{members:{}}};
    let return_val = {
        colors: state.drop_down.colors,
        //loggedIn:state.auth.loggedIn
    }

    if(typeof ownProps.match.params.id !=='undefined') {

        //
        /*return_val.initialValues = {
            members: state.users.members
        }*/

        return_val.initialValues = state.users.user_detail;
        //return_val.initialValues.members = state.users.members;
        if(typeof state.users.members != 'undefined') {
            console.log(state.users.members);

            //return_val.initialValues.members = state.users.members
        }
        //return_val.initialValues.members = {first_name: 'john', last_name: 'Doe'}
        //return_val.initialValues.members = [{first_name:'atul',last_name:'test'}];//state.users.user_info;

    }
    //console.log(return_val.initialValues.test={});
    return return_val;
}

/*export default reduxForm({
    validate,
    enableReinitialize:true,
    //validate:validate//same as above
    form:'initializeFromState'
})(
    connect(mapStateToProps,{createPost, getColors, PostEdit, updatePost})(PostNew)
);*/

//Working
/*export default connect(mapStateToProps,{createPost, getColors, PostEdit, updatePost})
(
    reduxForm({form:'initializeFromState',enableReinitialize:true})
    (PostNew)
);*/


//Working
UserAdd = (reduxForm({
    //validate,
    form: 'initializeFromState',
})(UserAdd))
UserAdd = connect(
    mapStateToProps,{PostList, createPost, getColors, PostEdit, updatePost, getCountry}
)(UserAdd)
export default UserAdd;


//Working

