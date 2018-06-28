import React,{Component} from 'react';
import InputBox from '../common-component/Input'
import RadioButton from '../common-component/Radio'
import SelectBox from '../common-component/Select';
import Checkbox from '../common-component/Check';
import SelectCountry from '../common-component/Country';
import SelectState from '../common-component/State';
import {toastr} from 'react-redux-toastr';
import Autosuggest from 'react-autosuggest';
import {createPost, getColors, PostEdit, updatePost, getCountry, getState, checkEmail, getSuggestionsValue} from "../../actions/index";
import {connect} from 'react-redux';
import _ from 'lodash';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

//Include jquery
import $ from 'jquery';
window.$ = $;
//End jquery

class CustomerAdd extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            gender:'',
            color:'',
            countries:{},
            country:'',
            state_names:{},
            state_name:'',
            status:false,
            photo:null,
            isSubmitted:false,
            city_names:['Indore', 'Ujjain', 'Bhopal'],
            email_options:{'yes':'Yes','no':'No'},
            email:'',
            show_email:'',
            checked_city:[],
            show_city:false,
            city:'',
            duplicate_email:'',
            email_msg:false,
            duplicate:'no',
            value: '',
            language:'',
            suggestions: [],
            model: 'Example text',
            startDate: moment()


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onFileChange = this.onFileChange.bind(this);
        let city_names = ['Indore', 'Ujjain', 'Bhopal'];

        this.handleDateChange = this.handleDateChange.bind(this);

        this.handleModelChange = this.handleModelChange.bind(this);
        /*this.props.getSuggestionsValue('a', (res) => {
            console.log('hi',res);
        })*/
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }


    handleModelChange(model) {
        this.setState({
            model: model
        });
    }


    getSuggestionValue = suggestion => suggestion.title;
    renderSuggestion = suggestion => (<div>{suggestion.title}</div>);


    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,//no need
            language:newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {

        this.props.getSuggestionsValue(value, (res) => {
            if(res.items.length > 0) {
                this.setState({
                    suggestions: res.items
                });
            }else{
                this.onSuggestionsClearRequested();
            }
        })
        /*this.setState({
            suggestions: this.getSuggestions(value)
        });*/
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    componentDidMount() {

        this.props.getColors((res) => {
            this.setState({colors: res});
        });

        this.props.getCountry((res) => {
            this.setState({countries:res.countries});
        });


        if(this.props.match.params.id) {

            const {id} = this.props.match.params;

            this.props.PostEdit(id, (res)=>{

                this.setState({
                    name:res.user.name,
                    gender:res.user.gender,
                    color:res.user.color,
                    status:res.user.status,
                    country:res.user.country,
                    state:res.user.state,
                    city:res.user.city?res.user.city:'',
                    email:res.user.email,
                    language:res.user.language,
                    model:res.user.description

                });
                let city = res.user.city;
                let email = res.user.email;
                let state_id = res.user.state;
                let dob = moment(res.user.dob);

                this.props.getState(res.user.country, (res) => {
                    this.setState({state_names: res.state_names});
                    this.setState({state_name: state_id});
                });

                if(city != "" && city != null) {
                    this.setState({show_city:true})
                }
                if(email != "" && email != null) {
                    this.setState({show_email:'yes'})
                }

                if(dob != '') {
                    this.setState({startDate: dob});
                }

            });

        }
    }

    onInputChange(value) {
        this.setState({name:value});
    }
    onGenderChange(value) {
        this.setState({gender:value});
    }
    onSelectColor(value) {
        this.setState({color:value});
    }
    onChangeCheckbox(value){
        this.setState({status:value});

    }
    onCountryChange(value) {
        this.setState({country:value});

        if(value>0) {
            this.props.getState(value, (res) => {
                this.setState({state_names: res.state_names});
            });
        }else{
            this.setState({state_names:{}})
        }
    }
    onStateChange(value) {
        this.setState({state_name:value});
    }
    onCityChange(value) {
        this.setState({show_city:value});

    }
    handleCity(value) {
        this.setState({city:value});
    }
    onEmailSelect(value) {
        this.setState({show_email:value});
    }
    handleEmail(value){
        this.props.checkEmail(value, (response) => {
            this.setState({
                duplicate_email:response.data.message,
                email_msg:true,
                duplicate:response.data.duplicate
            });
            //toastr.success('Title', response.data.message)

        })

        this.setState({email:value});
    }

    /*onFileChange(e){
        this.setState({photo:e.target.files[0]});
    }*/

    handleSubmit(e){

        e.preventDefault();
        let name = e.target.name.value;
        let gender = e.target.gender.value;
        let color = e.target.color.value;
        let country_id = e.target.country.value;
        let state_id = e.target.state.value;
        //let city = (e.target.city.value) ? this.state.city : null;
        let city =  (this.state.show_city) ? e.target.city.value:null;
        let status = (e.target.status.value=='true' || e.target.status.value==1) ? 1 : 0;
        let language = e.target.language.value;
        let description = this.state.model;
        //let email = (this.state.show_email && this.state.show_email === 'yes') ? e.target.email.value : null;
        let email = '';
        if(this.state.show_email && this.state.show_email === 'yes'){
             email = e.target.email.value;

        }else{
             email = '';
        }
        //const formData = new FormData();
        //formData.append("photo", this.state.photo);

        let dob = moment(this.state.startDate).format('YYYY-MM-DD');


        let values = {name:name, gender:gender, color:color, status:status, email:email,
            country_id:country_id,state_id:state_id, city:city,language:language,
            description:description, dob:dob
        };


        if(name != "" && gender != "" && color != "" && this.state.duplicate=='no' && description!= "") {

            if(this.props.match.params.id) {


                //values.photo = this.state.photo;
                const id = this.props.match.params.id;
                this.props.updatePost(id, values, (response) => {
                    if (response.data.status === 0) {
                        this.setState({errors: response.data.errors});
                    } else {
                        toastr.success('Title', 'Record updated')
                        this.props.history.push('/');
                    }
                })
            } else {

                this.props.createPost(values, (response) => {
                    if (response.data.status === 0) {
                        this.setState({errors: response.data.errors});
                    } else {
                        toastr.success('Title', 'Record created')
                        this.props.history.push('/');
                    }
                })
            }
        }
    }



    render(){
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value:this.state.language,
            onChange: this.onChange,
            name:'language'
        };

        return(
          <div>
              <form onSubmit={this.handleSubmit}>
                  <InputBox name='name' label='Name'
                            onChange={(e) => {this.onInputChange(e.target.value)}}
                            value={this.state.name}
                            isSubmitted={this.state.isSubmitted}
                  />
                  <RadioButton label1='Male' label2='Female' name='gender'
                               value={this.state.gender}
                               onChange={(e) => {this.onGenderChange(e.target.value)}}
                               isSubmitted={this.state.isSubmitted}

                  />
                  <SelectBox name='color' label='Color' colors={this.state.colors}
                             onChange={(e) => {this.onSelectColor(e.target.value)}}
                             value={this.state.color}
                             isSubmitted={this.state.isSubmitted}
                  />

                  <Checkbox name='status' label='Status' onChange={(event)=>{
                      this.onChangeCheckbox(event.target.checked)
                  }} value={this.state.status} isSubmitted={this.state.isSubmitted}
                            checked={this.state.status}
                  />
                  <SelectCountry name='country' label='Country' countries={this.state.countries}
                             onChange={(e) => {this.onCountryChange(e.target.value)}}
                             value={this.state.country}
                             isSubmitted={this.state.isSubmitted}
                  />

                  <SelectState name='state' label='State' states={this.state.state_names}
                    onChange={(e) => {this.onStateChange(e.target.value)}}
                    value={this.state.state_name}
                    isSubmitted={this.state.isSubmitted}
                  />



                  <Checkbox name='check_city' label='Show City' onChange={(event)=>{
                      this.onCityChange(event.target.checked)
                  }} value={this.state.show_city} isSubmitted={this.state.isSubmitted}
                            checked={this.state.show_city}
                  />

                  {this.state.show_city &&
                    <div>
                        <InputBox name='city' label='City' value={this.state.city}
                            onChange={(e)=>{this.handleCity(e.target.value)}}
                               isSubmitted={this.state.isSubmitted}
                    />
                    </div>
                  }

                  <SelectBox name='show_email' label='Show Email' colors={this.state.email_options}
                             onChange={(e) => {this.onEmailSelect(e.target.value)}}
                             value={this.state.show_email}
                             isSubmitted={this.state.isSubmitted}
                  />
                  {
                      (this.state.show_email && this.state.show_email == 'yes') &&
                          <div>
                              <InputBox name='email' label='Email' value={this.state.email}
                                        onChange={(e)=>{this.handleEmail(e.target.value)}}
                                        isSubmitted={this.state.isSubmitted}
                              />
                          </div>

                  }
                  {
                      (this.state.email_msg &&
                          <div>{this.state.duplicate_email}</div>
                      )
                  }

                  <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                  />
                  <div>
                      <FroalaEditor
                          tag='textarea'
                          model={this.state.model}
                          onModelChange={this.handleModelChange}
                      />
                      {
                          (!this.state.model && this.state.isSubmitted &&

                            <div>Description is required</div>
                          )


                      }
                  </div>
                  <div>
                      <DatePicker
                          readOnly='readOnly'
                          dateFormat="YYYY-MM-DD"
                          selected={this.state.startDate}
                          onChange={this.handleDateChange}
                      />
                      {
                          (!this.state.startDate &&
                              <div>Date is required</div>
                          )
                      }
                  </div>
                  
                                  {/*{
                      _.map(this.state.city_names, (val, key) =>{
                          return(
                              <div key={key}>{val}
                              <input type='checkbox' value={val}
                                  onChange={(e)=>{this.onHandleCity(e.target.checked)}}
                                     name='city[]' />
                              </div>
                          )
                      })
                  }*/}
                      {/*<input type='file' name='photo' onChange={this.onFileChange} />*/}


                  <button type='submit'
                          onClick={() => {this.setState({isSubmitted:true})}}>
                      Submit
                  </button>
              </form>
          </div>
        );
    }
}



export default connect('',{createPost, PostEdit, updatePost, getColors, getCountry, getState, checkEmail, getSuggestionsValue})(CustomerAdd);