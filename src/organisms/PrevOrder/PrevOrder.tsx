import BasketCard from "../../molecules/BasketCard/BasketCard";
import {FC, useEffect, useState} from "react";
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import "./PrevOrder.scss"
import {IPrevOrder, IPrevOrderDevices} from "../../types/types";



const PrevOrder:FC<IPrevOrder> = ({ order}) => {
    const [sum, setSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [promotionSum, setPromotionSum] = useState(0)
    const [goodsNum, setGoodsNum] = useState(0);
    const [date, setDate] = useState<string[]>([])
    function determineMonth(month:string):string{
        if (month === "01"){
            return "Январь"
        }else if(month==="02"){
            return "Февраль"
        }else if(month==="03"){
            return "Март"
        }else if(month==="04"){
            return "Апрель"
        }else if(month==="05"){
            return "Май"
        }else if(month==="06"){
            return "Июнь"
        }else if(month==="07"){
            return "Июль"
        }else if(month==="08"){
            return "Август"
        }else if(month==="09"){
            return "Сентябрь"
        }else if(month==="10"){
            return "Октябрь"
        }else if(month==="11"){
            return "Ноябрь"
        }else{
            return "Декабрь"
        }
    }
    const determineDates = (date:string)=>{
        if (!date){
            return
        }
        let arr:string[] = [];
        const day = date.split('T')[0].split('-')[2];
        arr.push(day)
        const month = date.split('T')[0].split('-')[1];
        arr.push(determineMonth(month));
        const year = date.split('T')[0].split("-")[0];
        arr.push(year)
        setDate(arr)
    }

    function calculateAll() {
        setGoodsNum(order.length)
        let sum = 0
        let promotionSum = 0;
        let totalSum = 0;
        for (let i=0; i<order.length; i++){
            sum += order[i].device.price
            promotionSum += order[i].device.newPrice===0?(0):(order[i].device.price- order[i].device.newPrice);
        }
        totalSum = sum-promotionSum
        setSum(sum)
        setPromotionSum(promotionSum)
        setTotalSum(totalSum)
    }

    useEffect(()=>{
        calculateAll();
        /*determineDates(order[0].updatedAt);*/
    }, [])

    function doDevices(orders:IPrevOrderDevices[]) {
        let arr = [];
        for (let i = 0; i<orders.length; i++){
            arr.push(orders[i].device)
        }
        return arr
    }
    return(
        <div className="prevOrder">
            <div className="prevOrder__leftBlock">
                <h3 className="prevOrder__title">Заказ №{/*{order[0].orderId}*/} от {/*{date? (<span>{date[0]} {date[1]} {date[2]}</span>):""}*/}</h3> {/*подумать еще*/}
                {order.map((item)=>
                    <BasketCard key={item.id} device={item.device} from="prevOrder"/>
                )}
            </div>
            <div className="prevOrder__rightBlock">
                <OrderMenu text="Повторить заказ" promotionSum={promotionSum} sum={sum} totalSum={totalSum} goodsNum={goodsNum} devices={doDevices(order)}/>
            </div>
        </div>
    )
}

export default PrevOrder;