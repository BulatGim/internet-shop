import "./PersonalAccount.scss"
import avatarImg from "./imgs/avatar.svg"
import FormInput from "../../atoms/formInput/formInput";
import {useState} from "react";
import Review from "../../molecules/review/review";
import devicePreview from "../BasketPage/imgs/devicePreview.svg";
import PrevOrder from "../../organisms/PrevOrder/PrevOrder";
import OrderMenu from "../../molecules/orderMenu/orderMenu";
import Dialog from "../../molecules/Dialog/Dialog";
import addresseeAvatar from "./imgs/addresseeAvatar.svg"

export default function PersonalAccount() {
    const [activeTab, setActiveTab] = useState("personalData")
    const user = {
        img: avatarImg,
        surname: "Иванов",
        name: "Иван",
        patronymic: "Иванович",
        phone: "+7(499)999-99-99",
        birthday: "28.06.2000",
        email: "Ivanov@gmail.com",
        gender: "M"
    }
    const reviews = [{
        userName: "username1",
        date: "28.06.2020",
        rateNumber: "4,6",
        reviewItem: [{
            title: "Plus",
            text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
        }, {
            title: "Minus",
            text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
        }, {
            title: "Comment",
            text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
        },
        ]
    },{
        userName: "username1",
        date: "28.06.2020",
        rateNumber: "4,6",
        reviewItem: [{
            title: "Plus",
            text: "there is some plus",
        }, {
            title: "Minus",
            text: "there is some minus",
        }, {
            title: "Comment",
            text: "there is some comment",
        },
        ]
    },{
        userName: "username1",
        date: "28.06.2020",
        rateNumber: "4,6",
        reviewItem: [{
            title: "Plus",
            text: "there is some plus",
        }, {
            title: "Minus",
            text: "there is some minus",
        }, {
            title: "Comment",
            text: "there is some comment",
        },
        ]
    },
    ];
    const prevOrders = [
        {
            number: 51,
            date: "19.04.2020",
            devices:[{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },
            ],
        },{
            number: 51,
            date: "19.04.2020",
            devices:[{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },{
                img: devicePreview,
                title: "Смартфон Xiaomi 12 Pro Blue 12GB 256GB",
                price: {
                    oldPrice: 15600,
                    newPrice: 9600
                },
                amount: 10,
                amountInBasket: 1
            },
            ],
        },

    ];
    const dialogs = [{
        addresseePhoto: addresseeAvatar,
        title: "Some title",
        lastMessage:"Some text",
        addressee: "Попов Дмитрий Иванович",
        date: "28.06.2021"
    },{
        addresseePhoto: addresseeAvatar,
        title: "Some title",
        lastMessage:"Some text",
        addressee: "Попов Дмитрий Иванович",
        date: "28.06.2021"
    },{
        addresseePhoto: addresseeAvatar,
        title: "Some title",
        lastMessage:"Some text",
        addressee: "Попов Дмитрий Иванович",
        date: "28.06.2021"
    },
    ]

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
                <form className="personalData__form" action="">
                    <div className="avatar">
                        <img className="avatar__preview" src={avatarImg} alt=""/>
                        <label className="avatar__label" htmlFor="avatar">
                            <span className="avatar__title">Выберите файл</span>

                        </label>
                        <input className="avatar__input" name="avatar" type="file" id="avatar"/>
                    </div>
                    <FormInput placeholder="Фамилия" text={user.surname} width={25}/>
                    <div className="namePatronymic">
                        <FormInput placeholder="Имя" text={user.name} width={11}/>
                        <FormInput placeholder="Отчество" text={user.patronymic} width={13}/>
                    </div>
                    <div className="phoneBirthday">
                        <FormInput placeholder="Телефон" text={user.phone} width={13}/>
                        <FormInput placeholder="Дата рождения" text={user.birthday} width={11}/>
                    </div>
                    <FormInput placeholder="Email" text={user.email} width={25}/>
                    <FormInput placeholder="Введите пароль" width={25}/>
                    <button className="sendBtn" type="submit"><p>Сохранить</p></button>
                </form>
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_orders orders" data-showing="orders">
                <span className="orders__title">Ваши заказы</span>
                {prevOrders?(
                    <div>
                        {prevOrders.map((item,index)=>
                            <PrevOrder key={index} order={item}/>
                        )}
                    </div>
                ):(
                    <h2 className="orders__null">Вы не сделали не одного заказа</h2>
                )}
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_reviews reviews" data-showing="reviews">
                <h3 className="reviews__title">Ваши отзывы</h3>
                <div className="yoursReviews">
                    {reviews.map((item,index)=>
                        <Review key={index} review={item}/>
                    )}
                </div>
            </div>
            <div className="PersonalAccount__item PersonalAccount__item_chat chat" data-showing="chat">
                <h3 className="chat__title">Ваши диалоги</h3>
                <div className="Dialogs">
                    {dialogs.map((dialog,index)=>
                        <Dialog key={index} dialog={dialog}/>
                    )}
                </div>
            </div>
        </div>
    )
}