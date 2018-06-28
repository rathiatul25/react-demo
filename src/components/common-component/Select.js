import React,{Component} from 'react';
import _ from 'lodash';

export default function SelectBox({name, label, onChange, isSubmitted, value, colors}) {
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
                <option value="">Select {label}</option>
                {
                    _.map(colors, (val,key) => {
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