import React,{Component} from 'react';

export default function RadioButton({name, label1, label2, onChange, isSubmitted, value}) {
    const renderError = (value, isSubmitted)=> {
        if(!value && isSubmitted) {
            return (
                <div>{name} is required</div>
            )
        }
    }
    return(
        <div>
            {label1}<input type='radio' name={name} onChange={onChange} value='Male' checked={value=='Male'} />
            {label2}<input type='radio' name={name} onChange={onChange} value='Female' checked={value=='Female'} />
            {renderError(value, isSubmitted)}
        </div>

    )
}