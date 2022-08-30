import "./PersonalAccount.scss"
import {useEffect, useState, useContext} from "react";
import Review from "../../molecules/review/review";
import PrevOrder from "../../organisms/PrevOrder/PrevOrder";
import Dialog from "../../molecules/Dialog/Dialog";
import axios from "axios";
import Registration from "../../organisms/registration/registration";
import SliderSomeItems from "../../organisms/SliderSomeItems/SliderSomeItems";
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import NewDialogForm from "../../organisms/newDialogForm/newDialogForm";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const PersonalAccount=observer(()=> {
    const [isNewDialogActive, setIsNewDialogActive] = useState(false)
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    const [dialogs, setDialogs] = useState([])

    const {prevOrders} = useContext(Context);

    const fetchData = async (setter, address) =>{
        const result = await axios(
            process.env.REACT_APP_API_URL+address+'/'
        );
        setter(result.data)
    }

    const fetchDataConfig = async (setter, address, config) => {
        const result = await axios(
            process.env.REACT_APP_API_URL+address+'/',
            config
        );
        setter(result.data)
        return result.data
    };
    useEffect(  () => {
        /*fetchData(setPromotions, "promotions");*/
        fetchDataConfig(prevOrders.setPreviousOrders, "/orders", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        fetchDataConfig(setUser, "user/getOne", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then((data)=>fetchData(setReviews,  "rating/user/"+data.user.id));
        fetchDataConfig(setDialogs, "/dialogs", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
    }, [])

    useEffect(()=>{
        fetchDataConfig(setDialogs, "/dialogs", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
    }, [isNewDialogActive])

    function changeTab(e) {
        let newTab = e.target.getAttribute("data-show");
        let activeClass = "PersonalAccount__item_active";
        document.querySelector("."+activeClass).classList.remove(activeClass);
        document.querySelector(`[data-showing=${newTab}]`).classList.add(activeClass);
        document.querySelector("."+"PAMenu__item_active").classList.remove("PAMenu__item_active");
        document.querySelector(`[data-show=${newTab}]`).classList.add("PAMenu__item_active");
    }
    return (
        <div className="PersonalAccount">
            <div className="PAMenu" onClick={e => changeTab(e)}>
                <h3 className="PAMenu__item PAMenu__item_active PAMenu__item_personalData"
                    data-show="personalData">Личные данные</h3>
                <h3 className="PAMenu__item PAMenu__item_orders" data-show="orders">Ваши заказы</h3>
                <h3 className="PAMenu__item PAMenu__item_reviews" data-show="reviews">Ваши отзывы</h3>
                <h3 className="PAMenu__item PAMenu__item_chat" data-show="chat">Чат с поддержкой</h3>
            </div>
            <div
                className="PersonalAccount__item PersonalAccount__item_active PersonalAccount__item_personalData PersonalData"
                data-showing="personalData">
                <span className="PersonalData__title">Редактирование личных данных</span>
                <Registration valuesProps={user.user} />
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_orders orders" data-showing="orders">
                <span className="orders__title">Ваши заказы</span>
                {prevOrders.PreviousOrders?(
                    <div>
                        {prevOrders.PreviousOrders?.map((item,index)=>
                            <PrevOrder key={index} order={item}/>
                        )}
                    </div>
                ):(
                    <h2 className="orders__null">Вы не сделали ни одного заказа</h2>
                )}
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_reviews reviews" data-showing="reviews">
                <h3 className="reviews__title">Ваши отзывы</h3>
                <div className="yoursReviews">
                    <SliderSomeItems arrayItems={reviews.map((item,index)=>
                        <Review key={index} review={item}/>
                    )}/>
                </div>
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_chat chat" data-showing="chat">
                <h3 className="chat__title">Ваши диалоги</h3>
                <button className="chat__new" onClick={()=> setIsNewDialogActive(true)}><h3>Создать новый чат</h3></button>
                {isNewDialogActive?(
                    <ModalTemplate closeSetter={()=>setIsNewDialogActive(false)} >
                        <NewDialogForm closeSetter={()=>setIsNewDialogActive(false)}/>
                    </ModalTemplate>
                ):("")}
                <div className="Dialogs">
                    {dialogs.map((dialog)=>
                        <Dialog key={dialog.id} dialog={dialog}/>
                    )}
                </div>
            </div>
        </div>
    )
})

export default PersonalAccount;
