import {useState, useContext, useEffect, MouseEvent, SetStateAction, Dispatch} from 'react';
import "./Header.scss"
import {Link, NavLink} from "react-router-dom";
import loupe from "./imgs/loupe.svg"
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import axios from "axios";
import {CATALOGUE_ROUTE} from "../../utils/consts";
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import InfoBlock from "../../molecules/infoBlock/infoBlock";
import {ITypes} from "../../types/types";
import {fetchSomeData} from "../../http/userAPI";

const Header = observer( (props)=>{
    const context = useContext<any>(Context)

    const [isPanelActive, setIsPanelActive] = useState<boolean>(false);
    const [isCatalogActive, setIsCatalogActive] = useState<boolean>(false);
    const [types, setTypes] = useState<ITypes[]>([])

    useEffect(()=>{
        fetchSomeData( "type", setTypes)
    }, [])

    useEffect(()=>{
        context.service.setOverFlowHidden(isCatalogActive)
    }, [isCatalogActive])

    return(
        <div className="header" onClick={()=>{setIsPanelActive(false); setIsCatalogActive(false)}}>
            <div className="header__main">
                <NavLink to={'/'} className="iShop">
                    <p className="iShop__title">BuG Corp.</p>
                    <p className="iShop__type">Internet Shop</p>
                </NavLink>
                <a className="phone" href="#"><p>+7 999 999 99 99</p></a>
                <div className="actionBlock">
                    <p className="actionsBlock__action">Проверить статус заказа</p>
                </div>
                <NavLink to={"/Contacts"} className="contacts" ><p>Контакты</p></NavLink>
                {context.user.isAuth?(
                    <div className="personalAccount">
                        <p className="personalAccount__title" onClick={(e)=> {
                            setIsPanelActive(prevState => !prevState);
                            e.stopPropagation()
                        }}>Здравствуйте, {context?.user?.user.name}</p>
                        {isPanelActive?(
                            <div className="panel">
                                <NavLink to={"/lk"} className="panel__item panel__item_lk"><p>Личный кабинет</p> </NavLink>
                                <NavLink to={"/basket"} className="panel__item panel__item__basket" ><p>Корзина</p> </NavLink>
                                <NavLink to={"/login"} onClick={()=> {
                                    localStorage.setItem("token", "")
                                    context.user.setIsAuth(false);
                                    context.user.setUser("")
                                }} className="panel__item panel__item__logOut"><p>Выйти</p> </NavLink>
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
                <div className="catalog" onClick={(e)=> {
                    setIsCatalogActive(prevState => !prevState);
                    e.stopPropagation()
                }}>
                    <div className="catalog__img" ></div>
                    <p className="catalog__description" >Каталог товаров</p>
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
                <div className="showedCatalog" >
                    {types.map(item=>
                        <Link className="showedCatalog__link" key={item.id} to={CATALOGUE_ROUTE+"/"+item.id}><h3 className="showedCatalog__item">{item.name}</h3></Link>
                    )}
                </div>
            ):("")}
            {context.service.modal.isModalActive ? (
                <ModalTemplate closeSetter={()=>context.service.setModal(false, null, null)} >
                    <InfoBlock operation={context.service.modal.operation} text={context.service.modal.text}/>
                </ModalTemplate>
            ):("")}
        </div>
    )
})
export default Header;