import {FC, useContext} from "react";
import "./orderMenu.scss"
import {Context} from "../../index";
import {newOrder} from "../../http/userAPI";

interface IOrderMenuProps {
    text: string;
    totalSum?: number;
    goodsNum?: number;
    sum?: number;
    promotionSum?: number;
}

const OrderMenu:FC<IOrderMenuProps> = (props)=>{
    const context = useContext<any>(Context)
    const makeNewOrder = async()=>{
        const data = await newOrder(context.basket.userBasket)
        console.log(data)
    }
    return(
        <div className="content__menu">
            <button className="arrange" onClick={()=>makeNewOrder()}><h3>{props.text}</h3></button>
            <div className="summary">
                <div className="summary__item summary__item_main">
                    <h3>Итого </h3>
                    <h3>{props.totalSum}.-</h3>
                </div>
                <div className="summary__item summary__item_amount">
                    <span>Всего {props.goodsNum} товара</span>
                    <span>{props.sum}.-</span>
                </div>
                <div className="summary__item summary__item_promotion">
                    <span>Скидка</span>
                    <span>{props.promotionSum}.-</span>
                </div>
            </div>
        </div>
    )
}
export default OrderMenu;