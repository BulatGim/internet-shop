import "./BasketCard.scss"
import alertImg from "./imgs/alert.svg"
import favouriteImg from "./imgs/heart.svg"
import destroyImg from "./imgs/close.svg"
import toBasket from "./imgs/toBasket.svg"
import {FC, useEffect, useState, Dispatch, SetStateAction} from "react";
import {IBasket, IDeviceCard} from "../../types/types";
import axios from "axios";

interface IBasketCardProps {
    device: IDeviceCard;
    from: string;
}

const BasketCard: FC<IBasketCardProps> = (props)=> {
    return(
        <div className="BasketCard">
            <img src={process.env.REACT_APP_STATIC_URL+""+props.device.img} alt="" className="BasketCard__preview"/>
            <div className="card">
                <div className="deviceInfo">
                    <div className="infoHeader">
                        <p className="infoHeader__title">{props.device.name}</p>
                        {props.device.amount<=10?(
                            <div className="amount">
                                <img src={alertImg} alt="" className="amount__alert"/>
                                <span className="amount__title">Осталось {props.device.amount} шт.</span>
                            </div>
                        ):("")}
                    </div>
                    {props.device.newPrice?(
                        <div className="price">
                            <p className="price__new">{props.device.newPrice}.-</p>
                            <span className="price__old">{props.device.price}</span>
                        </div>
                    ):(
                        <div className="price">
                            <p className="price__new">{props.device.price}.-</p>
                        </div>
                    )}
                </div>
                <div className="devicePanel">
                    <div className="main">
                        <div className="favourites">
                            <img src={favouriteImg} alt="" className="favourites__img"/>
                            <span className="favourites__title">В избранное</span>
                        </div>
                        {props.from==="basket"?(
                            <div className="destroy">
                                <img src={destroyImg} alt="" className="destroy__img"/>
                                <span className="destroy__title">Убрать</span>
                            </div>
                        ):(
                            <div className="addToBasket">
                                <img src={toBasket} alt="" className="addToBasket__img"/>
                                <span className="addToBasket__title">Добавить в корзину</span>
                            </div>
                        )}
                    </div>
                    <div className="amountInBasket">
                        <button className="amountInBasket__btn"><p>-</p></button>
                        <input className="amountInBasket__input" type="number"/>
                        <button className="amountInBasket__btn"><p>+</p></button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default BasketCard;