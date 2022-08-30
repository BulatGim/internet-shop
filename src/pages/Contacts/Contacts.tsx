import telegramImg from "./imgs/telegram.svg";
import gitImg from "./imgs/git.svg"
import "./Contacts.scss";
import FormInput from "../../atoms/formInput/formInput";
import {sendContacts} from "../../http/userAPI";
import {FC, useCallback, useContext, useState} from "react";
import {IFormValues} from "../../types/types";
import {IUserError} from "../../types/types";
import {Context} from "../../index";


const Contacts:FC = ()=>{

    const [values, setValues] = useState<IFormValues>({});
    const [userError, setUserError] = useState<IUserError[]>([])
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    let context = useContext<any>(Context)

    function handleChange(e:any) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function hideUserError(formInput:string) {

        for (let i = 0; i < userError.length; i++){
            if (userError[i].formInput === formInput){
                let arr = userError;
                arr.splice(i, 1)
                setUserError(arr)
                forceUpdate();
            }
        }
        return false
    }
    function showUserError(formInput:string, errorMessage:string){
        let prev;
        userError.map((item)=>{
            if (item.formInput===formInput){
                prev=true
            }
        })
        if (prev){
            return
        }
        let obj:any = {
            error: errorMessage,
            formInput: formInput
        }
        let errors:any[] = userError;
        errors.push(obj);
        setUserError(errors)
        forceUpdate();
    }

    function nameValidation(){
        values.name?hideUserError("name"):showUserError("name", "Имя не может быть пустым")
    }
    function emailValidation () {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (values.email === '')
            ? showUserError("email", "Email не может быть пустым")
            : hideUserError("email")
            || (!regex.test(String(values.email).toLowerCase()))
                ? showUserError("email", "Некорректный email")
                : hideUserError("email")
    }

    async function send() {
        nameValidation();
        emailValidation();
        if (userError.length<1){
            try {
                await sendContacts(values.name, values.email, values.comment|| "Без комментария")
                context.service.setModal(true,"success", "Форма успешно доставлена, скоро отвечу;)")
                setValues({})
            }catch (e) {
                context.service.setModal(true,"failure", e.message)
            }
        }
    }


    return(
        <div className="Contacts">
            <h2 className="Contacts__title">Контакты</h2>
            <div className="Contacts__main">
                <div className="Contacts__text">
                    <h3>Еще раз здравствуйте! Я рад, что вы продолжили сёрфить по моему сайту, и перешли на эту страницу.
                        Я бы хотел вам кратко рассказать зачем же нужен этот сайт. Однажды мне сказали, что я никогда не смогу сделать интернет-магазин с полным его функционалом, после этого я бросил себе вызов сделать его.
                        В этом интернет магазине использованы следующие технологии:
                        Frontend: React(react-hooks), mobx, typescrypt, dotenv
                        Backend: NodeJS, bcrypt, express,cors,express-fileupload, jsonwebtoken, sequelize, postgreSQL, pgAdmin, cors, dotenv
                        Design: Figma</h3>
                    <h3 className="text__alert">
                        Позвольте напомнить вам еще раз, этот сайт не продает товары или услуги, он служит исключительно в качестве примера моей работы.
                    </h3>
                    <div className="contactMe">
                        <h2 className="contactMe__title">Связаться со мной</h2>
                        <h3 className="contactMe__mail">Mail: bulat.gimaletdinov.01@gmail.com</h3>
                        <div className="contactMe__telegram">
                            <h3 className="contactMe__text">telegram: @BulatGim</h3>
                            <img src={telegramImg} alt=""/>
                        </div>
                        <div className="contactMe__git">
                            <h3 className="contactMe__text">git: <a href="https://github.com/BulatGim">BulatGim</a></h3>
                            <img src={gitImg} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="askQuestion">
                    <h3 className="askQuestion__title">Задать вопрос</h3>
                        <div className="askQuestion__aboutUser">
                            <FormInput name={"name"} value={values.name || ""} errors={userError} placeholder="Имя" width={17} setter={handleChange}/>
                            <FormInput name={"email"} value={values.email || ""} errors={userError} placeholder="Email" width={17} setter={handleChange} input={true}/>
                        </div>
                        <FormInput name={"comment"} value={values.comment || ""} errors={userError} placeholder="Текст сообщения" width={35} height={10} setter={handleChange}/>
                        <button className="askQuestion__send" onClick={send}><h3>Отправить</h3></button>
                </div>
            </div>
        </div>
    )
}

export default Contacts;