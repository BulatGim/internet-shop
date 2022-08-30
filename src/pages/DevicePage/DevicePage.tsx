import Reviews from "../../organisms/Reviews/Reviews";
import {Link, useParams} from "react-router-dom"

import "./DevicePage.scss"
import compareImg from "./imgs/compare.svg";
import favouriteImg from "./imgs/favourite.svg"

import {useContext, useEffect, useState} from "react";
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import * as Scroll from "react-scroll"
import axios from "axios";

import {addToBasketAndInform, fetchSomeData} from "../../http/userAPI"
import {Context} from "../../index";
import {ICountedDevices, IDeviceCard, IReview} from "../../types/types";

const DevicePage = () => {
    const context= useContext<any>(Context);
    const deviceOptions = [{
        option: "64GB",
    }, {
        option: "128GB",
    }, {
        option: "256GB",
    }
    ]
    const [reviews, setReviews] = useState<IReview[]>()
    const [device, setDevice] = useState<IDeviceCard>()
    const [devices, setDevices] = useState<ICountedDevices>()

    const params = useParams();

    let scroll = Scroll.animateScroll;

    const toTop = ()=>scroll.scrollToTop();

    useEffect(  () => {
        fetchSomeData( "rating/devices/"+params.id, setReviews);
        fetchSomeData( "device/"+params.id, setDevice);
        fetchSomeData( "device", setDevices);

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
                            {device?.device_colors?device.device_colors.map(item=>
                                <div className="color__item" style={{background: "#"+item.color}} ></div>
                            ):("Нет доступных цветов")}
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
                        <h3 className="reviews__averageRating">{device?.rating}</h3>
                        <h3 className="reviews__ratingsNumber">{device?.ratingsNumber} отзывов</h3>
                    </Link>
                    <div className="price">
                        <h3 className={device?.newPrice!==0?("price__oldPrice_lineThrough price__oldPrice"):("price__oldPrice")}>{device?.price}</h3>
                        {device?.newPrice!==0? (
                            <h2 className="price__newPrice">{device?.newPrice}.-</h2>
                        ):("")}
                    </div>
                    {context.user._isAuth?(<div className="actions">
                        <button className="actions__main" onClick={()=>addToBasketAndInform(device?.id, context)}><h2>В корзину</h2></button>
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
            <Reviews reviews={reviews} generalRate={device?.rating||""} device={device}/>
            <DeviceBlock deviceBlock={devices?.rows||[]} title={"Похожие товары"} />
        </div>
    )
}

export default DevicePage;