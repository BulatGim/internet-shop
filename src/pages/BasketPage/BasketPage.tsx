import {useContext, useEffect, useState} from "react";
import closeImg from "./imgs/close.svg"
import devicePreview from "./imgs/devicePreview.svg"
import BasketCard from "../../molecules/BasketCard/BasketCard";
import "./BasketPage.scss"
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import {Context} from "../../index";
import axios from "axios";
import {observer} from "mobx-react-lite";
import {IDeviceCard} from "../../types/types";

const BasketPage = observer(()=>{
    let context = useContext<any>(Context)

    const [sum, setSum] = useState<number>(0)
    const [totalSum, setTotalSum] = useState<number>(0)
    const [promotionSum, setPromotionSum] = useState<number>(0)
    const [goodsNum, setGoodsNum] = useState<number>(0)

    function calculateAll() {
        setGoodsNum(context.basket.userBasket.length)
        let sum = 0
        let promotionSum = 0;
        let totalSum = 0;
        for (let i=0; i<context.basket.userBasket.length; i++){
            sum += context.basket.userBasket[i].price
            promotionSum += context.basket.userBasket[i].newPrice===0?(0):(context.basket.userBasket[i].price- context.basket.userBasket[i].newPrice);
        }
        totalSum = sum-promotionSum
        setSum(sum)
        setPromotionSum(promotionSum)
        setTotalSum(totalSum)
    }
    useEffect(()=>{
        calculateAll()
    }, [context.basket.userBasket])
    async function destroyAll() {
        await axios.delete(
            process.env.REACT_APP_API_URL+'basket/',
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
        )
        await context.basket.setBasketDevices();
    }

    return(
        <div className="BasketPage">
            <h2 className="BasketPage__title">Корзина</h2>
            <div className="destroyBasket">
                <img src={closeImg} alt="" className="destroyBasket__img"/>
                <p className="destroyBasket__title" onClick={()=>destroyAll()}>Убрать все ({context.basket.userBasket.length})</p>
            </div>
            <div className="content">
                {context.basket.userBasket.length>0 ?(
                    <div className="devices">
                        {context.basket.userBasket.map((device:IDeviceCard)=>
                            <BasketCard key={device.id} device={device} from="basket"/>
                        )}
                    </div>
                ):(
                    <h2 className="content__noContent">В корзине пусто ;)</h2>
                )}
                <OrderMenu text="Оформить заказ" promotionSum={promotionSum} sum={sum} totalSum={totalSum} goodsNum={goodsNum} devices={context.basket.userBasket}/>
            </div>
        </div>
    )
})

export default BasketPage;