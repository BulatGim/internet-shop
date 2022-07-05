import {useContext, useEffect, useState, useCallback, FC,} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import {login, registration, updateUserData} from "../../http/userAPI";
import {SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import "./registration.scss"

interface IFormValues {
    name?: string;
    surname?: string;
    patronymic?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    password?: string;
    repeatPassword?: string;
}
interface IUserError {
    formInput:string;
    message:string;
}
interface IRegistrationProps {
    valuesProps?: IFormValues
}

const Registration:FC<IRegistrationProps> = observer(({valuesProps}) => {
    const [values, setValues] = useState<IFormValues>({phone: "+7(___)___-__-__"});

    const {user, basket, service} = useContext<any>(Context)

    const [userError, setUserError] = useState<any[]>([])
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);
    let navigate = useNavigate();

    useEffect(()=>{
        valuesProps?(setValues({
            ...valuesProps,
            password: "",
            phone: "+7(___)___-__-__"
        })):setValues({phone: "+7(___)___-__-__"})
    }, [valuesProps])

    function handleChange(e:any) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleBigChange(value:string|number, inputName:string) {
        setValues({
            ...values,
            [inputName]: value
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

    async function send() {
        emailValidation();
        /*passwordValidation();*/
        try {
            let data;
            /*repeatPasswordValidation();*/
            nameValidation();
            dateValidation();
            if (userError.length<1){
                data = await valuesProps?updateUserData(values.name, values.surname, values.patronymic, /*phone,*/ values.birthday, values.email, values.password):registration(values.name, values.surname, values.patronymic, /*phone,*/ values.birthday, values.email, values.password)
                user.setUser(data);
                user.setIsAuth(true);
                valuesProps?(service.setModal(true,"success", "Данные успешно изменены!")):navigate(SHOP_ROUTE);
            }
        }catch (e) {
            return service.setModal(true,"error", e.message)
        }
    }

    function dateInputMask(e:any) {
        if(e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr:string[] | any = values.birthday&&values.birthday.split("");
            arr.pop()
            let str = arr.join("")
            handleBigChange(str, "birthday")
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            let arr:string[] | any = values.birthday&&values.birthday.split("");
            if (arr.length === 5 || arr.length === 2){
                handleBigChange(values.birthday+"/", "birthday");
            }
        }
    }

    function dateValidation(){
        let year = new Date().getFullYear()
        if (values.birthday){
            let arr:any = values.birthday.split("/")
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
    function phoneInputMask(e:any) {
        if (e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault()
            let arr: any = values.phone&&values.phone.split("").reverse();
            let abc:boolean;
            for (let i = 0; i<arr.length-2; i++){
                const regex = /[0-9]/;
                abc = regex.test(String(arr[i]).toLowerCase());
                if (abc){
                    arr.splice(i,1,"_")
                    let str = arr.reverse().join("")
                    return handleBigChange(str, "phone")
                }
            }
        }else if((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode<96 || e.keyCode>106)){
            return e.preventDefault()
        }else{
            e.preventDefault()
            let arr:any = values.phone&&values.phone.split("")
            const index = arr.findIndex((item:string)=> item==="_")
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
    return (
        <div className="registration">
            <form action="">
                <FormInput placeholder="Фамилия" errors={userError} name={"surname"} value={values.surname || ""} setter={handleChange} width={27}/>
                <div className="registration__name">
                    <FormInput placeholder="Имя" errors={userError} name={"name"} value={values.name || ""} setter={handleChange} width={14} required={true}/>
                    <FormInput placeholder="Отчество" errors={userError} name={"patronymic"} value={values.patronymic || ""} setter={handleChange} width={12}/>
                </div>
                <div className="registration__phoneDate">
                    <FormInput placeholder="Телефон" errors={userError} name={"phone"} validation={phoneInputMask} value={values.phone || ""} setter={handleChange} width={16}/>
                    <FormInput placeholder="Дата рождения" errors={userError} name={"birthday"} validation={dateInputMask} maxLength={10} width={10} value={values.birthday || ""} setter={handleChange}/>
                </div>
                <FormInput placeholder="E-mail" errors={userError} name={"email"} value={values.email || ""} setter={handleChange} width={27} required={true}/>
                <FormInput placeholder="Пароль" errors={userError} name={"password"} input={true} inputType={"password"} value={values.password || ""} setter={handleChange} width={27} required={true}/>
                <FormInput placeholder="Повторите пароль" errors={userError} name={"repeatPassword"} input={true} inputType={"password"} value={values.repeatPassword || ""} setter={handleChange} width={27} />
            </form>
            <button className="registration__send" type="submit" onClick={send}><p>Отправить</p></button>
        </div>
    );
});

export default Registration;