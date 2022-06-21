import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import FormInput from "../../atoms/formInput/formInput";
import "./Auth.scss"
import {registration, login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {SHOP_ROUTE} from "../../utils/consts";

const Auth = observer( ()=>{
    const {user} = useContext(Context)
    let navigate = useNavigate();

    const [auth, setAuth] = useState("registration")

    const [values, setValues] = useState({phone: "+7(___)___-__-__"});

    const [userError, setUserError] = useState([])
    console.log(userError)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    function handleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleBigChange(value, inputName) {
        setValues({
            ...values,
            [inputName]: value
        })
    }


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
        values.repeatPassword!==values.password?showUserError("repeatPassword", "Пароли должны совпадать"):hideUserError("repeatPassword");
    },[values.repeatPassword])

    /*function needSomeValidation(inputName, errorMsg){
        values.inputName?hideUserError(""+inputName):showUserError(""+inputName, errorMsg)
        console.log(values.inputName)
    }*/
    function passwordValidation(){
        values.password?hideUserError("password"):showUserError("password", "Пароль не может быть пустым")
    }
    function repeatPasswordValidation(){
        values.repeatPassword?hideUserError("repeatPassword"):showUserError("repeatPassword", "Пожалуйста, повторите пароль")
    }
    function nameValidation(){
        values.name?hideUserError("name"):showUserError("name", "Имя не может быть пустым")
    }
    console.log(values)

    async function send() {
        emailValidation();
        passwordValidation();
        try {
            let data;
                if (auth === "registration") {
                    repeatPasswordValidation();
                    nameValidation();
                    dateValidation();
                    if (userError.length<1){
                        data = await registration(values.name, values.surname, values.patronymic, /*phone,*/ values.birthday, values.email, values.password)
                        user.setUser(data);
                        user.setIsAuth(true)
                        navigate("/")
                    }
                } else if (auth === "login") {

                    if (userError.length<1){
                        data = await login(values.email, values.password)
                        user.setUser(data);
                        user.setIsAuth(true)
                        navigate(SHOP_ROUTE)
                    }
                } else {
                    console.log("error")
                }
        }catch (e) {
            return /*e.response.data.message*/ alert(e.response.data.message)
        }
    }

    function dateInputMask(e) {
        console.log(e.keyCode)
        if(e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr = values.birthday.split("");
            arr.pop()
            let str = arr.join("")
            handleBigChange(str, "birthday")
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            let arr = values.birthday.split("");
            if (arr.length === 5 || arr.length === 2){
                handleBigChange(values.birthday+"/", "birthday");
            }
        }
    }

    function dateValidation(){
        let year = new Date().getFullYear()
        if (values.birthday){
            let arr = values.birthday.split("/")
            if(arr[0]>32 || arr[1]>13 || arr[2]>year+1 || arr[2]<1900-1){
                if (arr[0]>32){
                    arr[0] = 31;
                    showUserError("birthday", "Введите корректную дату")
                }
                if(arr[1]>13){
                    arr[1] = 12;
                    showUserError("birthday", "Введите корректную дату");
                }
                if (arr[2]>year+1 || arr[2]<1900-1){
                    arr[2] = 2000;
                    showUserError("birthday", "Введите корректную дату")
                }
                arr[0] += "/";
                arr[1] += "/";
                let str = arr.join("");
                handleBigChange(str, "birthday")
            }else{
                hideUserError("birthday")
            }
        }else{
            return
        }
    }
    function phoneInputMask(e) {
        if (e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr = values.phone.split("").reverse();
            let abc = Boolean;
            for (let i = 0; i<arr.length-2; i++){
                const regex = /[0-9]/;
                abc = regex.test(String(arr[i]).toLowerCase());
                if (abc===true){
                    arr.splice(i,1,"_")
                    let str = arr.reverse().join("")
                    return handleBigChange(str, "phone")
                }
            }
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            e.preventDefault()
            let arr = values.phone.split("")
            const index = arr.findIndex((item)=> item==="_")
            arr[index] = e.key
            const str = arr.join("")
            handleBigChange(str, "phone")
        }
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

    return(
        <div className="Auth">
            {auth==="registration"?(
                <div className="registration popUp">
                    <h2 className="registration__title">Регистрация</h2>
                    <form action="">
                        <FormInput placeholder="Фамилия" errors={userError} name={"surname"} value={values.surname || ""} setter={handleChange} width={27.5}/>
                        <div className="registration__name">
                            <FormInput placeholder="Имя" errors={userError} name={"name"} value={values.name || ""} setter={handleChange} width={14} required={true}/>
                            <FormInput placeholder="Отчество" errors={userError} name={"patronymic"} value={values.patronymic || ""} setter={handleChange} width={12}/>
                        </div>
                        <div className="registration__phoneDate">
                            <FormInput placeholder="Телефон" errors={userError} name={"phone"} validation={phoneInputMask} value={values.phone || ""} setter={handleChange} width={16}/>
                            <FormInput placeholder="Дата рождения" errors={userError} name={"birthday"} validation={dateInputMask} maxLength={"10"} width={10} value={values.birthday || ""} setter={handleChange}/>
                        </div>
                        <FormInput placeholder="E-mail" errors={userError} name={"email"} value={values.email || ""} setter={handleChange} width={27.5} required={true}/>
                        <FormInput placeholder="Пароль" errors={userError} name={"password"} input={true} inputType={"password"} value={values.password || ""} setter={handleChange} width={27.5} required={true}/>
                        <FormInput placeholder="Повторите пароль" errors={userError} name={"repeatPassword"} input={true} inputType={"password"} value={values.repeatPassword || ""} setter={handleChange} width={27.5} />
                    </form>
                    <button className="popUp__send" type="submit" onClick={send}><p>Отправить</p></button>
                    <p className="registration__toLogin">Уже есть аккаунт? <span to="/login" onClick={()=> {
                        setAuth("login");
                        setUserError([])
                    }}>Войти</span></p>
                </div>
            ):(
                <div className="login popUp">
                    <h2 className="login__title">Войти</h2>
                    <form action="">
                        <FormInput value={values.email|| ""} setter={handleChange} name={"email"} errors={userError} required={true} placeholder="E-mail" width={27.5}/>
                        <FormInput placeholder="Пароль" errors={userError} name={"password"} input={true} inputType={"password"} value={values.password || ""} setter={handleChange} width={27.5} required={true}/>
                    </form>
                    <button className="popUp__send" type="submit" onClick={send}><p>Отправить</p></button>
                    <p className="login__text">Еще нет аккаунта?<span onClick={()=> {
                        setAuth("registration")
                        setUserError([])
                    }}>Зарегистрироваться</span></p>

                </div>
            )}
        </div>
    )
})

export default Auth;