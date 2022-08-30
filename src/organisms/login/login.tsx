import {FC, useCallback, useContext, useState} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import { login} from "../../http/userAPI";
import {SHOP_ROUTE} from "../../utils/consts";
import {IFormValues} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import "./login.scss"

const Login:FC = observer(() => {
    const {user, basket, service} = useContext<any>(Context)

    let navigate = useNavigate();

    const [values, setValues] = useState<IFormValues>({});

    const [userError, setUserError] = useState<any[]>([])

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    function handleChange(e: any) {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function hideUserError(formInput: string) {
        for (let i = 0; i < userError.length; i++) {
            if (userError[i].formInput === formInput) {
                let arr = userError;
                arr.splice(i, 1)
                setUserError(arr)
                forceUpdate();
            }
        }
        return false
    }

    function showUserError(formInput: string, errorMessage: string) {
        let prev;
        userError.map((item) => {
            if (item.formInput === formInput) {
                prev = true
            }
        })
        if (prev) {
            return
        }
        let obj: any = {
            error: errorMessage,
            formInput: formInput
        }
        let errors: any[] = userError;
        errors.push(obj);
        setUserError(errors)
        forceUpdate();
    }

    function emailValidation() {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (values.email === '')
            ? showUserError("email", "Email не может быть пустым")
            : hideUserError("email")
            || (!regex.test(String(values.email).toLowerCase()))
                ? showUserError("email", "Некорректный email")
                : hideUserError("email")
    }

    function passwordValidation() {
        values.password ? hideUserError("password") : showUserError("password", "Пароль не может быть пустым")
    }

    async function send() {
        emailValidation();
        passwordValidation();
        if (userError.length < 1) {
            try {
                login(values.email, values.password).then((data:any)=>{
                    user.setUser(data);
                    user.setIsAuth(true)
                    setValues({})
                }).then(()=>{
                    basket.setBasketDevices()
                    navigate(SHOP_ROUTE)
                })
            } catch (e) {
                return service.setModal(true, "failure", e.response.data.message)
            }
        }
    }

    return (
        <div className="popUp">
            <FormInput value={values.email || ""} setter={handleChange} name={"email"} errors={userError}
                       required={true} placeholder="E-mail" width={27.5}/>
            <FormInput placeholder="Пароль" errors={userError} name={"password"} input={true} inputType={"password"}
                       value={values.password || ""} setter={handleChange} width={27.5} required={true}/>
            <button className="popUp__send" onClick={send}><p>Отправить</p></button>
        </div>
    );
});

export default Login;