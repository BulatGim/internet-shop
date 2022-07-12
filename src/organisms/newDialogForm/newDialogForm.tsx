import {FC, useState, useCallback, useContext} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import {IError} from "../../types/types";
import "./newDialogForm.scss"
import {createNewDialog} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

interface IValuesDialogForm {
    title?: string;
    description?: string;
}
interface INewDialogForm {
    closeSetter: ()=>void
}

const NewDialogForm:FC<INewDialogForm> = observer(({closeSetter}) => {
    const [values, setValues] = useState<IValuesDialogForm>({})
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

    async function send() {
        try {
            let data = await createNewDialog(values.title, values.description)
            if (data){
                context.service.setModal(true,"success", "Новый чат создан")
            }
            return closeSetter()
        }catch (e) {
            context.service.setModal(true,"error", e.response.data.message?e.response.data.message:e.response.data.message)
            return closeSetter()
        }
    }
    return (
        <div className="newDialogForm">
            {/*<h2 className="newDialogForm__title">Создать новый диалог</h2>*/}
            <div className="newDialogForm-title">
                <h3 className="newDialogForm-title__title">Тема сообщения</h3>
                <FormInput errors={userError} name={"title"} value={values.title || ""} placeholder={"Введите название обращения"} width={28} setter={handleChange}/>
            </div>
            <div className="newDialogForm-description">
                <h3 className="newDialogForm-description__title">Сообщение</h3>
                <FormInput errors={userError} name={"description"} value={values.description || ""} placeholder={"Введите контент обращения"} width={28} setter={handleChange} height={10}/>
            </div>
            <button className="newDialogForm-send" onClick={send}><h3 className="newDialogForm-send__title">Отправить</h3></button>
        </div>
    );
});

export default NewDialogForm;