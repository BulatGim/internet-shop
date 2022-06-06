import React, {useState, useEffect} from "react";
import slide from "../DevicePage/imgs/pepe.svg"
import "./Main.scss"
import Slider from "../../molecules/Slider/Slider"
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import Reviews from "../../organisms/Reviews/Reviews";
import pepe from "../DevicePage/imgs/pepe.svg";
import axios from "axios";



const Main = () => {
    const slides = [slide, slide, slide, slide, slide]

    const [reviews, setReviews] = useState([])
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
        </div>
    )
}

export default Main;