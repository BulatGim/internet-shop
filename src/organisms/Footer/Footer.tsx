import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import "./Footer.scss"
import {Context} from "../../index";
import FormInput from "../../atoms/formInput/formInput";
import {IFormValues} from "../../types/types";
import {sendCallBack, sendContacts} from "../../http/userAPI";

const Footer = ()=> {
    const [values, setValues] = useState<IFormValues>({phone: "+7(___)___-__-__"});
    let userErrors:[] = []
    let context = useContext<any>(Context)

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

    async function send() {
        try {
            await sendCallBack(values.phone)
            context.service.setModal(true,"success", "Форма успешно доставлена, скоро отвечу;)")
            setValues({phone: "+7(___)___-__-__"})
        }catch (e) {
            context.service.setModal(true,"failure", e.message)
        }
    }


    return (
        <div className="footer">
            <div className="leftBlock">
                <h3 className="leftBlock__title">BuG Corp.</h3>
                <h3 className="leftBlock__title">Internet-shop</h3>
                <div className="aboutProject">
                    <span className="aboutProject__title">О проекте</span>
                    <p className="aboutProject__content">Документ</p>
                </div>
                <div className="toCustomers">
                    <span className="toCustomers__title">Покупателям</span>
                    <p className="toCustomers__content">Документ</p>
                    <p className="toCustomers__content">Документ</p>
                    <p className="toCustomers__content">Документ</p>
                    <p className="toCustomers__content">Документ</p>
                    <p className="toCustomers__content">Документ</p>
                </div>
            </div>
            <div className="centerBLock">
                <Link className="centerBlock__item" to="#"><h3>Каталог товаров</h3></Link>
                <Link className="centerBlock__item" to="#"><h3>Акции</h3></Link>
                <Link className="centerBlock__item" to="/Contacts"><h3>Контакты</h3></Link>
                <Link className="centerBlock__item" to={context.user.isAuth?('/basket'):('/login')}><h3>Корзина</h3></Link>
                <Link className="centerBlock__item" to={context.user.isAuth?('/lk'):('/login')}><h3>Личный кабинет</h3></Link>
            </div>
            <div className="rightBlock">
                <div className="callBack">
                    <h3 className="callBack__title">Заявка на обратный звонок</h3>
                    <FormInput errors={userErrors} name={"phone"} value={values.phone || ""} placeholder={"Введите телефон"} width={18} setter={handleChange} validation={phoneInputMask}/>
                    <button className="callBack__send" type="submit" onClick={send}><p>Отправить</p></button>
                </div>
                <div className="socialNetworks">
                    <h3 className="socialNetworks__item socialNetworks__item_telegram">telegram: @BulatGim</h3>
                    <a className="socialNetworks__link" target="_blank" href="https://vk.com/id452785509"><h3 className="socialNetworks__item socialNetworks__item_VK">Vkontakte</h3></a>
                    <a className="socialNetworks__link" href="mailto:bulat.gimaletdinov.01@gmail.com"><h3 className="socialNetworks__item socialNetworks__item_mail">bulat.gimaletdinov.01@gmail.com</h3></a>
                </div>
            </div>
        </div>
    )
}
export default Footer;