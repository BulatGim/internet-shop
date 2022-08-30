import {FC, useContext} from "react";
import "./orderMenu.scss"
import {Context} from "../../index";
import { newOrder} from "../../http/userAPI";
import {IDeviceCard} from "../../types/types";
import {observer} from "mobx-react-lite";

interface IOrderMenuProps {
    text: string;
    totalSum?: number;
    goodsNum?: number;
    sum?: number;
    promotionSum?: number;
    devices?: IDeviceCard[] | any
}

const OrderMenu:FC<IOrderMenuProps> = observer((props)=>{
    let context = useContext<any>(Context)
    const makeNewOrder = async()=>{
        try {
            await newOrder(props.devices)
            await context.basket.setBasketDevices()
        }catch (e) {
            context.service.setModal(true,"error", e.response.data.message?e.response.data.message:e.message)
        }
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
})
export default OrderMenu;