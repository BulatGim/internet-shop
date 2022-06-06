import BasketCard from "../../molecules/BasketCard/BasketCard";
import React from "react";
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import "./PrevOrder.scss"

export default function PrevOrder(props) {
    return(
        <div className="prevOrder">
            <div className="prevOrder__leftBlock">
                <h3 className="prevOrder__title">Заказ №{props.order.number} от {props.order.date}</h3>
                {props.order.devices.map((item,index)=>
                    <BasketCard key={index} device={item} from="prevOrder"/>
                )}
            </div>
            <div className="prevOrder__rightBlock">
                <OrderMenu text="Повторить заказ"/>
            </div>
        </div>
    )
}