import React,{Component} from 'react';

export default function InputBox({name, label, onChange, isSubmitted, value}) {
    const renderError = (value, isSubmitted)=> {
        if(!value && isSubmitted) {
            return (
                <div>{label} is required</div>
            )
        }
    }
    return(
        <div>
            {label}<input type='text' name={name} onChange={onChange} value={value}/>
            {renderError(value, isSubmitted)}
        </div>

    )
}