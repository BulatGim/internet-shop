import "./PersonalAccount.scss"
import {useEffect, useState, useContext, FC} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchSomeDataConfig} from "../../http/userAPI";
import Orders from "../../organisms/Orders/Orders";
import PersonalData from "../../organisms/PersonalData/PersonalData";
import ReviewsLk from "../../organisms/ReviewsLK/ReviewsLK";
import Chat from "../../organisms/Chat/Chat";

const PersonalAccount:FC = observer(() => {
    const context = useContext<any>(Context);

    const [tabs] = useState({
        personalData: <PersonalData />,
        orders: <Orders/>,
        reviews: <ReviewsLk/>,
        chat: <Chat/>,
    })

    const [activeTab, setActiveTab] = useState({
        tab: "personalData",
        component: tabs.personalData
    })

    useEffect(() => {
        fetchSomeDataConfig("/orders", context.prevOrders.setPreviousOrders)
    }, [])

    return (
        <div className="PersonalAccount">
            <div className="PAMenu">
                <h3 className={activeTab.tab==="personalData"?"PAMenu__item PAMenu__item_active PAMenu__item_personalData":("PAMenu__item PAMenu__item_personalData")}
                    onClick={() => setActiveTab({tab: "personalData",component: tabs.personalData})}>
                    Личные данные
                </h3>
                <h3 className={activeTab.tab==="orders"?"PAMenu__item PAMenu__item_active PAMenu__item_orders":("PAMenu__item PAMenu__item_orders")}
                    onClick={() => setActiveTab({tab: "orders",component: tabs.orders})}>
                    Ваши заказы
                </h3>
                <h3 className={activeTab.tab==="reviews"?"PAMenu__item PAMenu__item_active PAMenu__item_reviews":("PAMenu__item PAMenu__item_reviews")}
                    onClick={() => setActiveTab({tab: "reviews",component: tabs.reviews})}>Ваши
                    отзывы</h3>
                <h3 className={activeTab.tab==="chat"?"PAMenu__item PAMenu__item_active PAMenu__item_chat":("PAMenu__item PAMenu__item PAMenu__item_chat")}
                    onClick={() => setActiveTab({tab: "chat",component: tabs.chat})}>Чат с
                    поддержкой</h3>
            </div>
            {activeTab.component}
        </div>
    )
})

export default PersonalAccount;
