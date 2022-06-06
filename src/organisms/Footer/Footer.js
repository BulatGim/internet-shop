import React from 'react';

import "./Footer.scss"

const Footer = ()=> {

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
                <h3 className="centerBlock__item">Каталог товаров</h3>
                <h3 className="centerBlock__item">Акции</h3>
                <h3 className="centerBlock__item">Контакты</h3>
                <h3 className="centerBlock__item">Корзина</h3>
                <h3 className="centerBlock__item">Личный кабинет</h3>
            </div>
            <div className="rightBlock">
                <div className="callBack">
                    <h3 className="callBack__title">Заявка на обратный звонок</h3>
                    <form className="callBack__form" action="">
                        <input placeholder="+7(___) ___-__-__" type="text" className="callBack__phone"/>
                        <button className="callBack__send" type="submit"><p>Отправить</p></button>
                    </form>
                </div>
                <div className="socialNetworks">
                    <h3 className="socialNetworks__item socialNetworks__item_instagram">Instagram</h3>
                    <h3 className="socialNetworks__item socialNetworks__item_telegram">telegram</h3>
                    <h3 className="socialNetworks__item socialNetworks__item_VK">Vkontakte</h3>
                    <h3 className="socialNetworks__item socialNetworks__item_mail">info@bugShop.ru</h3>
                </div>
            </div>
        </div>
    )
}
export default Footer;