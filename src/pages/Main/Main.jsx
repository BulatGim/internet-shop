import {useState, useEffect, FC, useContext} from "react";
import slide1 from "./imgs/slide1.svg"
import slide2 from "./imgs/slide2.svg"
import slide3 from "./imgs/slide3.svg"
import "./Main.scss";
import {IReview} from "../../types/types";
import Slider from "../../molecules/Slider/Slider"
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import Reviews from "../../organisms/Reviews/Reviews";
import axios from "axios";
import {Context} from "../../index";


const Main = () => {
    let user = useContext(Context)
    const slides = [slide1, slide2, slide3]

    const [reviews, setReviews] = useState()
    const [promotions, setPromotions] = useState()
    const [watched, setWatched] = useState([])

    const fetchData = async (setter, address, config) => {
            const result = await axios(
                process.env.REACT_APP_API_URL+address+'/',
                config
            );
            setter(result.data)
    };
    useEffect(  () => {
        fetchData(setReviews, "rating");
        fetchData(setPromotions, "promotions");
        fetchData(setWatched, "watched", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

    }, [])
    return (
        <div className="Main">
            <Slider slides={slides}/>
            <DeviceBlock deviceBlock={promotions} title={"Акции"}/>
            <Reviews reviews={reviews} />
            <DeviceBlock deviceBlock={watched} title={"Вы смотрели"} noDevices={"Вам необходимо авторизоваться, чтобы видеть что вы уже посмотрели ;)"}/>
        </div>
    )
}

export default Main;