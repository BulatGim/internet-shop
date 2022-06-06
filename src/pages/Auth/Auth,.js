import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import FormInput from "../../molecules/formInput/formInput";
import "./Auth.scss"
import {registration, login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer( ()=>{
    const {user} = useContext(Context)

    const [auth, setAuth] = useState("registration")

    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("+7(___)___-__-__");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")

    const [userError, setUserError] = useState([])


    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    function hideUserError(formInput) {
        for (let i = 0; i < userError.length; i++){
            if (userError[i].formInput === formInput){
                let arr = userError;
                arr.splice(i, 1)
                setUserError(arr)
                forceUpdate();
            }
        }
    }
    function showUserError(formInput, errorMessage){
        let prev;
        userError.map((item)=>{
            if (item.formInput===formInput){
                prev=true
            }
        })
        if (prev){
            return
        }
        let obj = {
            error: errorMessage,
            formInput: formInput
        }
        let errors = userError;
        errors.push(obj);
        setUserError(errors)
        forceUpdate();
    }

    useEffect(()=>{
        repeatPassword!==password?showUserError("repeatPassword", "Пароли должны совпадать"):hideUserError("repeatPassword");
    },[repeatPassword])

    async function send() {
        try {
            let data;
            emailValidation();
            nameValidation();
            dateValidation();
            if (userError.length < 1) {
                if (auth === "registration") {

                    /*const phoneForSend = phone;
                    if (phoneForSend === "+7(___)___-__-__"){
                        setPhone("")
                    }*/
                    data = await registration(name, surname, patronymic, /*phone,*/ birthday, email, password)
                    user.setUser(user);
                    user.setIsAuth(true)
                    console.log(user)
                } else if (auth === "login") {
                    data = await login( email, password)
                    user.setUser(data);
                    user.setIsAuth(true)
                    console.log(data)
                } else {
                    console.log("error")
                }

            }
        }catch (e) {
            return /*e.response.data.message*/ console.log(e)
        }
    }

    function dateInputMask(e) {
        console.log(e.keyCode)
        if(e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr = birthday.split("");
            arr.pop()
            let str = arr.join("")
            setBirthday(str)
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            let arr = birthday.split("");
            if (arr.length === 5 || arr.length === 2){
                setBirthday(birthday+"/");
            }
        }
    }
    function dateValidation(){
        let year = new Date().getFullYear()
        let arr = birthday.split("/")
        if(arr[0]>31 || arr[1]>12 || arr[2]>year || arr[2]<1900){
            if (arr[0]>31){
                arr[0] = 31;
                showUserError("birthday", "Введите корректную дату")
            }
            if(arr[1]>12){
                arr[1] = 12;
                showUserError("birthday", "Введите корректную дату");
            }
            if (arr[2]>year || arr[2]<1900){
                arr[2] = 2000;
                showUserError("birthday", "Введите корректную дату")
            }
            arr[0] += "/";
            arr[1] += "/";
            let str = arr.join("");
            setBirthday(str);
        }else{
            hideUserError("birthday")
        }
    }
    function phoneInputMask(e) {
        if (e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr = phone.split("").reverse();
            let abc = Boolean;
            for (let i = 0; i<arr.length-2; i++){
                const regex = /[0-9]/;
                abc = regex.test(String(arr[i]).toLowerCase());
                if (abc===true){
                    arr.splice(i,1,"_")
                    let str = arr.reverse().join("")
                    return setPhone(str)
                }
            }
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            e.preventDefault()
            let arr = phone.split("")
            const index = arr.findIndex((item)=> item==="_")
            arr[index] = e.key
            const str = arr.join("")
            setPhone(str)
        }
    }
    function emailValidation () {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (email === '')
            ? showUserError("email", "Email не может быть пустым")
            : hideUserError("email")
            || (!regex.test(String(email).toLowerCase()))
                ? showUserError("email", "Некорректный email")
                : hideUserError("email")
    }
    function nameValidation(){
        return (name ==='')?showUserError("name", "Имя не может быть пустым"):hideUserError('name')
    }
    return(
        <div className="Auth">
            {auth==="registration"?(
                <div className="registration popUp">
                    <h2 className="registration__title">Регистрация</h2>
                    <form action="">
                        <FormInput placeholder="Фамилия" errors={userError} name={"surname"} value={surname} setter={setSurname} width={27.5}/>
                        <div className="registration__name">
                            <FormInput placeholder="Имя" errors={userError} name={"name"} value={name} setter={setName} width={14} required={true}/>
                            <FormInput placeholder="Отчество" errors={userError} name={"patronymic"} value={patronymic} setter={setPatronymic} width={12}/>
                        </div>
                        <div className="registration__phoneDate">
                            <FormInput placeholder="Телефон" errors={userError} name={"phone"} validation={phoneInputMask} value={phone} setter={setPhone} width={16}/>
                            <FormInput placeholder="Дата рождения" errors={userError} name={"birthday"} validation={dateInputMask} maxLength={"10"} width={10} value={birthday} setter={setBirthday}/>
                        </div>
                        <FormInput placeholder="E-mail" errors={userError} name={"email"} value={email} setter={setEmail} width={27.5} required={true}/>
                        <FormInput placeholder="Пароль" errors={userError} name={"password"} input={true} inputType={"password"} value={password} setter={setPassword} width={27.5} required={true}/>
                        <FormInput placeholder="Повторите пароль" errors={userError} name={"repeatPassword"} input={true} inputType={"password"} value={repeatPassword} setter={setRepeatPassword} width={27.5} />
                    </form>
                    <button className="popUp__send" type="submit" onClick={send}><p>Отправить</p></button>
                    <p className="registration__toLogin">Уже есть аккаунт? <span to="/login" onClick={()=>setAuth("login")}>Войти</span></p>
                </div>
            ):(
                <div className="login popUp">
                    <h2 className="login__title">Войти</h2>
                    <form action="">
                        <FormInput value={email} setter={setEmail} name={"email"} errors={userError} required={true} placeholder="E-mail" width={27.5}/>
                        <FormInput value={password} inputType={"password"} setter={setPassword} name={"password"} reqired={true} input={true} placeholder="Пароль" width={27.5}/>
                    </form>
                    <button className="popUp__send" type="submit" onClick={send}><p>Отправить</p></button>
                    <p className="login__text">Еще нет аккаунта?<span onClick={()=>setAuth("registration")}>Зарегистрироваться</span></p>

                </div>
            )}
        </div>
    )
})

export default Auth;