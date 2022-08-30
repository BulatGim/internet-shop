import {useState} from "react";
import "./Auth.scss"
import {observer} from "mobx-react-lite";
import Registration from "../../organisms/registration/registration";
import Login from "../../organisms/login/login";
import {FC} from "react";

const Auth:FC = observer( ()=>{

    const [auth, setAuth] = useState("registration")

    return(
        <div className="Auth">
            {auth==="registration"?(
                <div className="registration popUp">
                    <h2 className="registration__title">Регистрация</h2>
                    <Registration />
                    <p className="registration__toLogin">Уже есть аккаунт? <span onClick={()=> {
                        setAuth("login");
                    }}>Войти</span></p>
                </div>
            ):(
                <div className="login popUp">
                    <h2 className="login__title">Войти</h2>
                    <Login />
                    <p className="login__text">Еще нет аккаунта?<span onClick={()=> {
                        setAuth("registration")
                    }}>Зарегистрироваться</span></p>
                </div>
            )}
        </div>
    )
})

export default Auth;