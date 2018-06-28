import React,{Component} from 'react';

export default function CheckBox({name, label, onChange, isSubmitted, value, checked}) {

    const renderError =(value,isSubmitted)=>{
        if(!value && isSubmitted ){
            return (
                <div>
                    {name} is Required
                </div>
            )
        }
    }
    return(
        <div>
            {label}<input type='checkbox' name={name}
                          onChange={onChange} value={value}
                          checked={checked}
        />

            {/*{renderError(value, isSubmitted)}*/}
        </div>

    )
}

