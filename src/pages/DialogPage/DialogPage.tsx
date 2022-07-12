import {FC, useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchSomeDataConfig} from "../../http/userAPI";
import Message from "../../atoms/Message/Message";
import FormInput from "../../atoms/formInput/formInput";
import {IError} from "../../types/types";
import {Context} from "../../index";
import "./DialogPage.scss"
import {sendMessage} from "../../http/userAPI";

interface IMessage {
    id:number;
    createdAt:string;
    updatedAt:string;
    description: string;
    title: string;
    dialogId:number;
    userId:number
}

const DialogPage:FC = () => {
    const [messages, setMessages] = useState<IMessage[] | []>([])
    const [values, setValues] = useState<any>({})
    const [userError, setUserError] = useState<IError[] | []>([])
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    let context = useContext<any>(Context)


    function handleChange(e: any) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleBigChange(value: string | number, inputName: string) {
        setValues({
            ...values,
            [inputName]: value
        })
    }


    function hideUserError(formInput: string) {
        for (let i = 0; i < userError.length; i++){
            if (userError[i].formInput === formInput){
                let arr = userError;
                arr.splice(i, 1)
                setUserError(arr)
                forceUpdate();
            }
        }
    }
    function showUserError(formInput: string, errorMessage:string){
        let prev;
        userError.map((item)=>{
            if (item.formInput===formInput){
                prev=true
            }
        })
        if (prev){
            return
        }
        let obj= {
            error: errorMessage,
            formInput: formInput
        }
        let errors:any = userError;
        errors.push(obj);
        setUserError(errors)
        forceUpdate();
    }

    let params = useParams();

    useEffect(()=>{
        fetchSomeDataConfig("messages/"+params.id, setMessages)
    }, [])

    async function send() {
        try {
            let data = await sendMessage(values.description, params.id)
            if (data){
                handleBigChange("", "description")
                fetchSomeDataConfig("messages/"+params.id, setMessages)
            }
        }catch (e) {
            context.service.setModal(true,"error", e.response.data.message?e.response.data.message:e.response.data.message)
        }

    }

    console.log(messages);
    return (
        <div className="dialogPage">
            <div className="dialogPage-messagesContainer">
                {messages.map((message)=>
                    <Message id={message.id} createdAt={message.createdAt} description={message.description} userId={message.userId}/>
                )}
            </div>
            <div className="dialogPage-send">
                <FormInput errors={userError} name={"description"} value={values.description || ""} placeholder={"Введите сообщение"} width={70} setter={handleChange}/>
                <button className="dialogPage-send__btn" onClick={send}>Отправить</button>
            </div>
        </div>
    );
};

export default DialogPage;