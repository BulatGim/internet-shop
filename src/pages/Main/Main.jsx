import {useState, useEffect, FC} from "react";
import slide1 from "./imgs/slide1.svg"
import slide2 from "./imgs/slide2.svg"
import slide3 from "./imgs/slide3.svg"
import "./Main.scss";
import {IReview} from "../../types/types";
import Slider from "../../molecules/Slider/Slider"
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import Reviews from "../../organisms/Reviews/Reviews";
import axios from "axios";
import TsXblock from "../../TSXblock";



const Main = () => {
    const slides = [slide1, slide2, slide3]

    const [reviews, setReviews] = useState()
    const [promotions, setPromotions] = useState()
    const [watched, setWatched] = useState([])

    const fetchData = async (setter, address) => {
            const result = await axios(
                process.env.REACT_APP_API_URL+address+'/',
            );
            setter(result.data)
    };
    useEffect(  () => {
        fetchData(setReviews, "rating");
        fetchData(setPromotions, "promotions");
        fetchData(setWatched, "watched");
    }, [])
    return (
        <div className="Main">
            <Slider slides={slides}/>
            <DeviceBlock deviceBlock={promotions} title={"Акции"}/>
            <Reviews reviews={reviews} />
            <DeviceBlock deviceBlock={watched} title={"Вы смотрели"}/>
            <TsXblock name={"someName"} surname={"someSurname"} />
        </div>
    )
}

export default Main;