import React, {useContext, useEffect, useState} from "react";
import closeImg from "./imgs/close.svg"
import devicePreview from "./imgs/devicePreview.svg"
import BasketCard from "../../molecules/BasketCard/BasketCard";
import "./BasketPage.scss"
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import {Context} from "../../index";
import axios from "axios";
import {getBasketDevices} from "../../http/userAPI";
import {observer} from "mobx-react-lite";

const BasketPage = observer(()=>{
    let context = useContext(Context)
    let basket = useContext(Context).basket.userBasket
    /*const [values, setValues] = useState({});
    function handleChange(name, value){
        setValues({
            ...values,
            [name]: Number(value)
        })
    }
*/
    const [sum, setSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [promotionSum, setPromotionSum] = useState(0)
    const [goodsNum, setGoodsNum] = useState(0)

    const [deleted, setDeleted] = useState()

    function calculateAll() {
        setGoodsNum(basket.length)
        let sum = 0
        let promotionSum = 0;
        let totalSum = 0;
        for (let i=0; i<basket.length; i++){
            sum += basket[i].price
            promotionSum += basket[i].newPrice===0?(0):(basket[i].price- basket[i].newPrice);
            console.log(sum, promotionSum)
        }
        totalSum = sum-promotionSum
        setSum(sum)
        setPromotionSum(promotionSum)
        setTotalSum(totalSum)
    }
    useEffect(()=>{
        calculateAll()
    }, [])
    async function destroyAll() {
        let data = await axios.delete(
            process.env.REACT_APP_API_URL+'basket/',
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
        )
        setDeleted(data)
        let basketDevices = await getBasketDevices()
        context.basket.setUserBasket(basketDevices)
    }

    return(
        <div className="BasketPage">
            <h2 className="BasketPage__title">Корзина</h2>
            <div className="destroyBasket">
                <img src={closeImg} alt="" className="destroyBasket__img"/>
                <p className="destroyBasket__title" onClick={()=>destroyAll()}>Убрать все ({basket.length})</p>
            </div>
            <div className="content">
                {basket ?(
                    <div className="devices">
                        {basket.map(device=>
                            <BasketCard key={device.id} device={device} from="basket"/>
                        )}
                    </div>
                ):(
                    <h2>В корзине пусто ;)</h2>
                )}
                <OrderMenu text="Оформить заказ" promotionSum={promotionSum} sum={sum} totalSum={totalSum} goodsNum={goodsNum} devices={basket}/>
            </div>
        </div>
    )
})

export default BasketPage;