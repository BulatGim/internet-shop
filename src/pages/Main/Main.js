import {useState, useEffect, FC, useContext} from "react";
import slide0 from './imgs/slide.png'
import slide1 from "./imgs/slide1.png"
import slide2 from "./imgs/slide2.png"
import "./Main.scss";
import Slider from "../../molecules/Slider/Slider"
import DeviceBlock from "../../organisms/deviceBlock/deviceBlock";
import Reviews from "../../organisms/Reviews/Reviews";
import axios from "axios";


const Main = () => {
    /*const arr = [2, 27, 14, 52, 31, 96, 73, 47, 22, 6];

    function quickSort(list) {
        if (list.length<=1){
            return list
        }
        let pivot = list[Math.floor(list.length/2)]
        let rightList = [];
        let leftList = [];
        for (let i = 0; i<list.length-1; i++){
            if (list[i]<=pivot){
                leftList.push(list[i])
            }
            if (list[i]>pivot){
                rightList.push(list[i])
            }
        }
        return [...quickSort(leftList), pivot, ...quickSort(rightList)]
    }*/


    const slides = [slide0, slide1, slide2]

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