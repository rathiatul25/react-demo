import React,{Component} from 'react';
import _ from 'lodash';

export default function SelectCountry({name, label, onChange, isSubmitted, value, countries}) {
    const renderError = (value, isSubmitted)=> {
        if(!value && isSubmitted) {
            return (
                <div>{label} is required</div>
            )
        }
    }
    return(
        <div>
            {label}
            <select name={name} onChange={onChange} value={value}>
                <option value="">Select country</option>
                {
                    _.map(countries, (val,key) => {
                        return (
                            <option value={key} key={key}>{val}</option>
                        )
                    })
                }
            </select>
            {renderError(value, isSubmitted)}
        </div>

    )
}