import "./PersonalAccount.scss"
import {useEffect, useState} from "react";
import Review from "../../molecules/review/review";
import PrevOrder from "../../organisms/PrevOrder/PrevOrder";
import Dialog from "../../molecules/Dialog/Dialog";
import axios from "axios";
import Registration from "../../organisms/registration/registration";
import SliderSomeItems from "../../organisms/SliderSomeItems/SliderSomeItems";
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import NewDialogForm from "../../organisms/newDialogForm/newDialogForm";

export default function PersonalAccount() {
    const [isNewDialogActive, setIsNewDialogActive] = useState(false)
    const [activeTab, setActiveTab] = useState("personalData")
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    const [prevOrders, setPrevOrders] = useState([])
    const [dialogs, setDialogs] = useState([])

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
        fetchDataConfig(setPrevOrders, "/orders", {
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
                    data-show="personalData">???????????? ????????????</h3>
                <h3 className="PAMenu__item PAMenu__item_orders" data-show="orders">???????? ????????????</h3>
                <h3 className="PAMenu__item PAMenu__item_reviews" data-show="reviews">???????? ????????????</h3>
                <h3 className="PAMenu__item PAMenu__item_chat" data-show="chat">?????? ?? ????????????????????</h3>
            </div>
            <div
                className="PersonalAccount__item PersonalAccount__item_active PersonalAccount__item_personalData PersonalData"
                data-showing="personalData">
                <span className="PersonalData__title">???????????????????????????? ???????????? ????????????</span>
                <Registration valuesProps={user.user} />
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_orders orders" data-showing="orders">
                <span className="orders__title">???????? ????????????</span>
                {prevOrders?(
                    <div>
                        {prevOrders.map((item,index)=>
                            <PrevOrder key={index} order={item}/>
                        )}
                    </div>
                ):(
                    <h2 className="orders__null">???? ???? ?????????????? ???? ???????????? ????????????</h2>
                )}
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_reviews reviews" data-showing="reviews">
                <h3 className="reviews__title">???????? ????????????</h3>
                <div className="yoursReviews">
                    <SliderSomeItems arrayItems={reviews.map((item,index)=>
                        <Review key={index} review={item}/>
                    )}/>
                </div>
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_chat chat" data-showing="chat">
                <h3 className="chat__title">???????? ??????????????</h3>
                <button className="chat__new" onClick={()=> setIsNewDialogActive(true)}><h3>?????????????? ?????????? ??????</h3></button>
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
}