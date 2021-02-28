import React from 'react';
import './../common.scss';

export function Input(props){
    return(
        <input type={props.type} placeholder={props.placeholder} style={{width: props.width, marginRight: props.marginRight}} className="input-field" value={props.value} onChange={(e)=> console.log(e.target.value)} />
    )
}
export function Label(props){
    return(
        <label className="label">{props.label}</label>
    )
}

export function Anchor(props){
    return(
        <a className="anchor-non-hyper">{props.label}</a>
    )
}

export function Button(props){
    
}