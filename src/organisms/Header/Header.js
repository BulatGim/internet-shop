import React, {useState, useContext, useEffect} from 'react';
import "./Header.css"
import {Link, NavLink} from "react-router-dom";
import loupe from "./imgs/loupe.svg"
import {observer} from "mobx-react-lite";
import {user} from "../../store/UserState"
import {Context} from "../../index";

const Header = observer( (props)=>{
    const user = useContext(Context)
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isCatalogActive, setIsCatalogActive] = useState(false);
    /*let [isAuth, setIsAuth] = useState();*/
    /*useEffect(()=>{
        setIsAuth(user.isAuth)
    },[])*/
    const catalogItems = [{
        title: "Смартфоны и гаджеты",
        link: "/1",
    },{
        title: "Видеотехника",
        link: "/1",
    },{
        title: "Сетевое оборудование",
        link: "/1",
    },{
        title: "Ноутбуки и планшеты",
        link: "/1",
    },{
        title: "Компьютеры",
        link: "/1",
    },
    ]
    function showHidePopup(e) {
        if (e.target.getAttribute("data-show-panel")==="show"){
            isPanelActive===true?setIsPanelActive(false):setIsPanelActive(true)
            setIsCatalogActive(false)
        }else if(e.target.getAttribute("data-show-catalog")==="show"){
            setIsPanelActive(false);
            isCatalogActive===true?setIsCatalogActive(false):setIsCatalogActive(true);
        }else{
            setIsPanelActive(false);
            setIsCatalogActive(false)
        }
    }
    return(
        <div className="header" onClick={(e)=>showHidePopup(e)}>
            <div className="header__main">
                <NavLink to={'/'} className="iShop">
                    <p className="iShop__title">BuG Corp.</p>
                    <p className="iShop__type">Internet Shop</p>
                </NavLink>
                <a className="phone" href="#"><p>+7 999 999 99 99</p></a>
                <div className="actionBlock">
                    <p className="actionsBlock__action">Проверить статус заказа</p>
                </div>
                <NavLink to={"/Contacts"} className="contacts" href="#"><p>Контакты</p></NavLink>
                {user.user._isAuth?(
                    <div className="personalAccount">
                        <p className="personalAccount__title" data-show-panel="show">Здравствуйте, {user.user._user.name}</p>
                        {isPanelActive?(
                            <div className="panel">
                                <NavLink to={"/lk"} className="panel__item panel__item_lk" href="#"><p>Личный кабинет</p> </NavLink>
                                <NavLink to={"/basket"} className="panel__item panel__item__basket" href="#"><p>Корзина</p> </NavLink>
                                <NavLink to={"/login"} onClick={()=> {
                                    user.setIsAuth(false);
                                    user.setUser("")
                                    localStorage.setItem("token", "")
                                }} className="panel__item panel__item__logOut" href="#"><p>Выйти</p> </NavLink>
                            </div>
                        ):("")}
                    </div>
                ):(
                    <div className="personalAccount">
                        <Link className="personalAccount__title" to="/login"><p>Войти/зарегистрироваться</p></Link>
                    </div>
                )}

            </div>
            <div className="header__fixed">
                <div className="catalog" data-show-catalog="show">
                    <div className="catalog__img" data-show-catalog="show"></div>
                    <p className="catalog__description" data-show-catalog="show">Каталог товаров</p>
                </div>
                <form className="search">
                    <input placeholder="Введите название товара или его артикул" type="text" className="search__input"/>
                    <button className="search__btn"><img className="search__btnImg" src={loupe} alt="searchbtn"/></button>
                </form>
                <div className="compare">
                    <div className="compare__img"></div>
                    <p className="compare__description">Сравнение</p>
                </div>
                <div className="favourites">
                    <div className="favourites__img"></div>
                    <p className="favourites__description">Избранное</p>
                </div>
            </div>
            {isCatalogActive?(
                <div className="showedCatalog">
                    {catalogItems.map(item=>
                        <Link className="showedCatalog__link" to={item.link}><h3 className="showedCatalog__item">{item.title}</h3></Link>
                    )}
                </div>
            ):("")}
        </div>
    )
})
export default Header;