import React from "react";
import closeImg from "./imgs/close.svg"
import devicePreview from "./imgs/devicePreview.svg"
import BasketCard from "../../molecules/BasketCard/BasketCard";
import "./BasketPage.scss"
import OrderMenu from "../../molecules/orderMenu/orderMenu";

const BasketPage = ()=>{
    const basket ={
        basketAmount: 10,
        basketDevices:[{
            img: devicePreview,
            title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
            price: {
                oldPrice: 15600,
                newPrice: 9600
            },
            amount: 10,
            amountInBasket: 1
        },{
            img: devicePreview,
            title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
            price: {
                oldPrice: 15600,
                newPrice: 9600
            },
            amount: 10,
            amountInBasket: 1
        },{
            img: devicePreview,
            title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
            price: {
                oldPrice: 15600,
                newPrice: 9600
            },
            amount: 10,
            amountInBasket: 1
        },
        ]
    }
    return(
        <div className="BasketPage">
            <h2 className="BasketPage__title">Корзина</h2>
            <div className="destroyBasket">
                <img src={closeImg} alt="" className="destroyBasket__img"/>
                <p className="destroyBasket__title">Убрать все ({basket.basketAmount})</p>
            </div>
            <div className="content">
                <div className="devices">
                    {basket.basketDevices.map(device=>
                        <BasketCard device={device} from="basket"/>
                    )}
                </div>
                <OrderMenu text="Оформить заказ"/>
            </div>
        </div>
    )
}

export default BasketPage;