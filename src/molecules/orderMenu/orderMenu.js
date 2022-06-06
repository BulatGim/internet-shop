import React from "react";
import "./orderMenu.scss"

export default function OrderMenu(props) {
    return(
        <div className="content__menu">
            <button className="arrange"><h3>{props.text}</h3></button>
            <div className="summary">
                <div className="summary__item summary__item_main">
                    <h3>Итого </h3>
                    <h3>195600.-</h3>
                </div>
                <div className="summary__item summary__item_amount">
                    <span>Всего 34 товара</span>
                    <span>220700.-</span>
                </div>
                <div className="summary__item summary__item_promotion">
                    <span>Скидка</span>
                    <span>15700.-</span>
                </div>
            </div>
        </div>
    )
}