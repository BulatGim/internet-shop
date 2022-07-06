import BasketCard from "../../molecules/BasketCard/BasketCard";
import React, {useEffect, useState} from "react";
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import "./PrevOrder.scss"

export default function PrevOrder(props) {
    const [sum, setSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [promotionSum, setPromotionSum] = useState(0)
    const [goodsNum, setGoodsNum] = useState(0)

    function calculateAll() {
        setGoodsNum(props.order.length)
        let sum = 0
        let promotionSum = 0;
        let totalSum = 0;
        for (let i=0; i<props.order.length; i++){
            sum += props.order[i].device.price
            promotionSum += props.order[i].device.newPrice===0?(0):(props.order[i].device.price- props.order[i].device.newPrice);
        }
        totalSum = sum-promotionSum
        setSum(sum)
        setPromotionSum(promotionSum)
        setTotalSum(totalSum)
    }
    useEffect(()=>{
        calculateAll()
    }, [])
    function doDevices(orders) {
        let arr = [];
        for (let i = 0; i<orders.length; i++){
            arr.push(orders[i].device)
        }
        return arr
    }
    return(
        <div className="prevOrder">
            <div className="prevOrder__leftBlock">
                <h3 className="prevOrder__title">Заказ №{props.order[0].orderId} от {props.order[0].updatedAt}</h3>
                {props.order.map((item)=>
                    <BasketCard key={item.id} device={item.device} from="prevOrder"/>
                )}
            </div>
            <div className="prevOrder__rightBlock">
                <OrderMenu text="Повторить заказ" promotionSum={promotionSum} sum={sum} totalSum={totalSum} goodsNum={goodsNum} devices={doDevices(props.order)}/>
            </div>
        </div>
    )
}