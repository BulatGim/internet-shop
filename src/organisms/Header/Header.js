import React, {useState, useContext, useEffect} from 'react';
import "./Header.css"
import {Link, NavLink} from "react-router-dom";
import loupe from "./imgs/loupe.svg"
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import axios from "axios";
import {CATALOGUE_ROUTE} from "../../utils/consts";
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import InfoBlock from "../../molecules/infoBlock/infoBlock";

const Header = observer( (props)=>{
    const context = useContext(Context)
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isCatalogActive, setIsCatalogActive] = useState(false);
    const [types, setTypes] = useState([])

    const [modalActive, setModalActive] = useState(false)

    useEffect(()=>{
        fetchData(setTypes, "type")
    }, [])

    useEffect(()=>{
        context.service.setOverFlowHidden(isCatalogActive)
    }, [isCatalogActive])

    const fetchData = async (setter, address) => {
        const result = await axios(
            process.env.REACT_APP_API_URL+address+'/'
        );
        setter(result.data)
    };

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
                    <p className="actionsBlock__action">?????????????????? ???????????? ????????????</p>
                </div>
                <NavLink to={"/Contacts"} className="contacts" href="#"><p>????????????????</p></NavLink>
                {context.user.isAuth?(
                    <div className="personalAccount">
                        <p className="personalAccount__title" data-show-panel="show">????????????????????????, {context.user._user?context.user.user.name:""}</p>
                        {isPanelActive?(
                            <div className="panel">
                                <NavLink to={"/lk"} className="panel__item panel__item_lk" href="#"><p>???????????? ??????????????</p> </NavLink>
                                <NavLink to={"/basket"} className="panel__item panel__item__basket" href="#"><p>??????????????</p> </NavLink>
                                <NavLink to={"/login"} onClick={()=> {
                                    localStorage.setItem("token", "")
                                    context.user.setIsAuth(false);
                                    context.user.setUser("")
                                }} className="panel__item panel__item__logOut" href="#"><p>??????????</p> </NavLink>
                            </div>
                        ):("")}
                    </div>
                ):(
                    <div className="personalAccount">
                        <Link className="personalAccount__title" to="/login"><p>??????????/????????????????????????????????????</p></Link>
                    </div>
                )}

            </div>
            <div className="header__fixed">
                <div className="catalog" data-show-catalog="show">
                    <div className="catalog__img" data-show-catalog="show"></div>
                    <p className="catalog__description" data-show-catalog="show">?????????????? ??????????????</p>
                </div>
                <form className="search">
                    <input placeholder="?????????????? ???????????????? ???????????? ?????? ?????? ??????????????" type="text" className="search__input"/>
                    <button className="search__btn"><img className="search__btnImg" src={loupe} alt="searchbtn"/></button>
                </form>
                <div className="compare">
                    <div className="compare__img"></div>
                    <p className="compare__description">??????????????????</p>
                </div>
                <div className="favourites">
                    <div className="favourites__img"></div>
                    <p className="favourites__description">??????????????????</p>
                </div>
            </div>
            {isCatalogActive?(
                <div className="showedCatalog">
                    {types.map(item=>
                        <Link className="showedCatalog__link" to={CATALOGUE_ROUTE+"/"+item.id}><h3 className="showedCatalog__item">{item.name}</h3></Link>
                    )}
                </div>
            ):("")}
            {context.service.modal.isModalActive ? (
                <ModalTemplate closeSetter={()=>context.service.setModal(false, null, null)}>
                    <InfoBlock operation={context.service.modal.operation} text={context.service.modal.text}/>
                </ModalTemplate>
            ):("")}
        </div>
    )
})
export default Header;