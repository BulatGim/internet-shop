import Reviews from "../../organisms/Reviews/Reviews";
import {Link, useParams} from "react-router-dom"

import "./DevicePage.scss"
import compareImg from "./imgs/compare.svg";
import favouriteImg from "./imgs/favourite.svg"

import React, {useContext, useEffect, useState} from "react";
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import Scroll from "react-scroll"
import axios from "axios";
import {addToBasket, getBasketDevices} from "../../http/userAPI";

import {addToBasketAndInform} from "../../http/userAPI"
import {Context} from "../../index";
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import NewReview from "../../molecules/newReview/newReview";
import InfoBlock from "../../molecules/infoBlock/infoBlock";

const DevicePage = () => {
    const context= useContext(Context);
    const deviceOptions = [{
        option: "64GB",
    }, {
        option: "128GB",
    }, {
        option: "256GB",
    }
    ]
    const [reviews, setReviews] = useState()
    const [device, setDevice] = useState()
    const [devices, setDevices] = useState()

    const [reviewsInOneDevice, setReviewsInOneDevice] = useState()

    const [isInfo, setIsInfo] = useState(true)

    const params = useParams();

    let scroll = Scroll.animateScroll;

    const toTop = ()=>scroll.scrollToTop();

    const fetchData = async (setter, address) => {
        let config = {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        };
        let result = await axios.get(
            process.env.REACT_APP_API_URL+address,
            (context.user._isAuth && address==="device/"+params.id)?config:""
        );
        setter(result.data)
    };
    useEffect(  () => {
        fetchData(setReviews, "rating/devices/"+params.id);
        fetchData(setDevice, "device/"+params.id);
        fetchData(setDevices, "device");
        toTop();
    }, [params])


    return (
        <div className="DevicePage">
            <h1 className="DevicePage__title">{device? device.name: ""}</h1>
            <div className="DevicePage__main">
                <div className="leftBlock">
                    <div className="preview">
                        {device?(
                            <img className="preview__img" src={process.env.REACT_APP_STATIC_URL+""+device.img} alt=""/>
                        ):("")}
                    </div>
                    {/*<div className="characteristics">
                        <h2 className="characteristics__title">Характеристики</h2>
                        {parameters.map((item) =>
                            <div className="parameter">
                                <p className="parameter__title">{item.title}</p>
                                <p className="parameter__description">{item.description}</p>
                            </div>
                        )}
                    </div>*/}
                </div>
                <div className="rightBlock">
                    <div className="colorChoose">
                        <h3 className="colorChoose__title">Выберите цвет</h3>
                        <div className="color">
                            {device?(device.device_colors?device.device_colors.map(item=>
                                <div className="color__item" style={{background: "#"+item.color}} ></div>
                            ):("Нет доступных цветов")):("")}
                        </div>
                    </div>
                    <div className="option">
                        <h3 className="option__title">Память</h3>
                        <div className="optionChoose">
                            {deviceOptions.map((item) =>
                                <div className="optionChoose__item"><span
                                    className="optionChoose__text">{item.option}</span></div>
                            )}
                        </div>
                    </div>
                    <Link to={"#reviews"} className="reviews">
                        <span className="reviews__star"></span>
                        <h3 className="reviews__averageRating">{device?device.rating:""}</h3>
                        <h3 className="reviews__ratingsNumber">{device?device.ratingsNumber:""} отзывов</h3>
                    </Link>
                    <div className="price">
                        <h3 className={device&&device.newPrice!==0?("price__oldPrice_lineThrough price__oldPrice"):("price__oldPrice")}>{device?device.price:""}</h3>
                        {device&&device.newPrice!==0? (
                            <h2 className="price__newPrice">{device?device.newPrice:""}.-</h2>
                        ):("")}
                    </div>
                    {context.user._isAuth?(<div className="actions">
                        <button className="actions__main" onClick={()=>addToBasketAndInform(device.id, context)}><h2>В корзину</h2></button>
                        <button className="actions__secondary"><img className="secondarybtnImg" src={compareImg} alt=""/></button>
                        <button className="actions__secondary"><img className="secondarybtnImg" src={favouriteImg} alt=""/></button>
                    </div>):(<h2>Авторизуйтесь, чтобы использовать этот блок</h2>)}
                </div>
            </div>
            <div className="description">
                <h2 className="description__title">Описание</h2>
                <h3 className="description__content">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                    ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</h3>
            </div>
            <Reviews reviews={reviews} generalRate={device?device.rating:""} device={device}/>
            <DeviceBlock deviceBlock={devices?devices.rows:[]} title={"Похожие товары"} />
        </div>
    )
}

export default DevicePage;