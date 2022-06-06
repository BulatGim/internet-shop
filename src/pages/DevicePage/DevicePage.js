import Reviews from "../../organisms/Reviews/Reviews";
import {Link} from "react-router-dom"

import "./DevicePage.scss"

import pepe from "./imgs/pepe.svg"
import compareImg from "./imgs/compare.svg";
import favouriteImg from "./imgs/favourite.svg"

import React from "react";
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";

const DevicePage = () => {
    const deviceOptions = [{
        option: "64GB",
    }, {
        option: "128GB",
    }, {
        option: "256GB",
    }
    ]
    const parameters = [{
        title: "Размер",
        description: "50X120",
    }, {
        title: "Размер",
        description: "50X120",
    }, {
        title: "Размер",
        description: "50X120",
    }, {
        title: "Размер",
        description: "50X120",
    }, {
        title: "Размер",
        description: "50X120",
    }, {
        title: "Размер",
        description: "50X120",
    },
    ];
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
    const device = {
        title: "Смартфон Apple Iphone 12 pro",
        img: pepe,
        colors:["#11CD23", "#1151CD", "#DE1B00", "#CC00DE", "#E8DF0B"],
        reviews:{
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999
        }
    };
    const deviceBlock = {
        title: "Похожие товары",
        devices: [{
            preview: pepe,
            title: "Телефон №1 с объемом памяти 16",
            reviews: {
                averageRating: "4,5",
                ratingsNumber: "5"
            },
            price:{
                oldPrice: 54999,
                newPrice: 45999,
            }
        },{
            preview: pepe,
            title: "Телефон №1 с объемом памяти 16",
            reviews: {
                averageRating: "4,5",
                ratingsNumber: "5"
            },
            price:{
                oldPrice: 54999,
                newPrice: 45999,
            }
        },{
            preview: pepe,
            title: "Телефон №1 с объемом памяти 16",
            reviews: {
                averageRating: "4,5",
                ratingsNumber: "5"
            },
            price:{
                oldPrice: 54999,
                newPrice: 45999,
            }
        },
        ]
    }
    return (
        <div className="DevicePage">
            <h1 className="DevicePage__title">{device.title}</h1>
            <div className="DevicePage__main">
                <div className="leftBlock">
                    <div className="preview" ></div>
                    <div className="characteristics">
                        <h2 className="characteristics__title">Характеристики</h2>
                        {parameters.map((item) =>
                            <div className="parameter">
                                <p className="parameter__title">{item.title}</p>
                                <p className="parameter__description">{item.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="rightBlock">
                    <div className="colorChoose">
                        <h3 className="colorChoose__title">Выберите цвет</h3>
                        <div className="color">
                            {device.colors.map(color=>
                                <div className="color__item" style={{background: color}} ></div>
                            )}
                        </div>
                    </div>
                    <div className="option">
                        <h3 className="option__title">Память</h3>
                        <div className="optionChoose">
                            {deviceOptions.map((item) =>
                                <div className="optionChoose__item"><span
                                    className="optionChoose__text">{item.option}</span></div>
                            )}
                        </div>
                    </div>
                    <Link to={"#reviews"} className="reviews">
                        <span className="reviews__star"></span>
                        <h3 className="reviews__averageRating">{device.reviews.averageRating}</h3>
                        <h3 className="reviews__ratingsNumber">{device.reviews.ratingsNumber} отзывов</h3>
                    </Link>
                    <div className="price">
                        <h3 className="price__oldPrice">{device.price.oldPrice}</h3>
                        <h2 className="price__newPrice">{device.price.newPrice}.-</h2>
                    </div>
                    <div className="actions">
                        <button className="actions__main"><h2>В корзину</h2></button>
                        <button className="actions__secondary"><img className="secondarybtnImg" src={compareImg} alt=""/></button>
                        <button className="actions__secondary"><img className="secondarybtnImg" src={favouriteImg} alt=""/></button>
                    </div>
                </div>
            </div>
            <div className="description">
                <h2 className="description__title">Описание</h2>
                <h3 className="description__content">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                    ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</h3>
            </div>
            <Reviews reviews={reviews} generalRate={device.reviews}/>
            <DeviceBlock deviceBlock={deviceBlock}/>
        </div>
    )
}

export default DevicePage;