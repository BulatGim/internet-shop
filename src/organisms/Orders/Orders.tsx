import {useContext} from 'react';
import {IPrevOrderDevices} from "../../types/types";
import PrevOrder from "../PrevOrder/PrevOrder";
import "./Orders.scss"
import {Context} from "../../index";

const Orders = () => {
    const context = useContext<any>(Context)
    return (
        <div className="orders">
            <h3 className="orders__title">Ваши заказы</h3>
            {context.prevOrders.PreviousOrders ? (
                <div>
                    {context.prevOrders.PreviousOrders?.map((item: IPrevOrderDevices[], index: number) =>
                        <PrevOrder key={index} order={item}/>
                    )}
                </div>
            ) : (
                <h2 className="orders__null">Вы не сделали ни одного заказа</h2>
            )}
        </div>
    );
};

export default Orders;