import "./formInput.scss"
import {FC, useEffect, useState, ChangeEvent, KeyboardEvent} from "react";
import {IError} from "../../types/types";

interface IFromInputProps {
    errors: IError[];
    name: string;
    value: string | number;
    placeholder: string;
    input?: boolean;
    width: number;
    height?: number;
    inputType?: string;
    required?: boolean;
    setter: (e:ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>)=> void;
    validation?: (e:KeyboardEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>)=>void;
    maxLength?: number;
}

const FormInput:FC<IFromInputProps> = (props) => {
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
            let noError = true;
            arr.map((item)=>{
                if (item.formInput === props.name){
                    return noError = false;
                }else{
                    return
                }
            })
            if (noError === true){
                return setMessageError("");
            }
        }

    }
    return (
        <div className="formInput">
            <span
                className={props.value ? ("formInput__placeholder") : ("formInput__placeholder formInput__placeholder_big")}>{props.placeholder}</span>
            {props.input ? (
                <input className={messageError? ("formInput__input_error formInput__input"):("formInput__input")} type={props.inputType}
                       style={{width: props.width + "rem", height: props.height + "rem"}}
                       name={props.name}
                       value={props.value}
                       onChange={(e) => {props.setter(e); if (props.validation){props.validation(e)}}}
                       /*onKeyDown={(e)=>props.validation?props.validation(e):""}*/
                       required={props.required ? (true) : (false)}/>
            ) : (
                <textarea className={messageError? ("formInput__input_error formInput__input"):("formInput__input")}
                          style={{width: props.width + "rem", height: props.height + "rem"}}
                          value={props.value}
                          onChange={(e) => {props.setter(e); }}
                          onKeyDown={(e)=>props.validation?props.validation(e):""}
                          name={props.name} maxLength={props.maxLength}
                          required={props.required ? (true) : (false)}></textarea>
            )}
            <p className="formInput__error">{messageError}</p>
        </div>
    )
}
export default FormInput;