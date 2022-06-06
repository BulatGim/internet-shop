import "./formInput.scss"
import React, {useEffect, useState} from "react";

export default function FormInput(props) {
    const [messageError, setMessageError] = useState("")

    useEffect(()=>{
        showError();
    }, [props])
    function showError() {
        if(!messageError){
            if (!props.errors){
                return
            }
            let arr = props.errors;
            arr.map((item)=>{
                if (item.formInput === props.name){
                    console.log(item.error);
                    return setMessageError(item.error);
                }
            })
        }else{
            let arr = props.errors;
            let isError = true;
            arr.map((item)=>{
                if (item.formInput === props.name){
                    return isError = false;
                }
            })
            if (isError === true){
                return setMessageError("");

            }
        }

    }
    return (
        <div className="formInput">
            <span
                className={props.value ? ("formInput__placeholder") : ("formInput__placeholder formInput__placeholder_big")}>{props.placeholder}</span>
            {props.input ? (
                <input className="formInput__input" type={props.inputType}
                       style={{width: props.width + "rem", height: props.height + "rem"}}
                       value={props.value}
                       onChange={(e) => {props.setter(e.target.value); if (props.validation){props.validation(e)}}}
                       /*onKeyDown={(e)=>props.validation?props.validation(e):""}*/
                       name={props.name}
                       required={props.required ? (true) : (false)}/>
            ) : (
                <textarea className="formInput__input"
                          style={{width: props.width + "rem", height: props.height + "rem"}}
                          value={props.value}
                          onChange={(e) => {props.setter(e.target.value); }}
                          onKeyDown={(e)=>props.validation?props.validation(e):""}
                          name={props.name} maxLength={props.maxLength}
                          required={props.required ? (true) : (false)}></textarea>
            )}
            {messageError}
        </div>
    )
}