import ReviewItem from "../../atoms/reviewItem/reviewItem"

import "./review.scss"
import {useState, useEffect} from "react";

export default function Review(props){
    const [date, setDate] = useState()
    function determineMonth(month){
        if (month === "01"){
            return "Январь"
        }else if(month==="02"){
            return "Февраль"
        }else if(month==="03"){
            return "Март"
        }else if(month==="04"){
            return "Апрель"
        }else if(month==="05"){
            return "Май"
        }else if(month==="06"){
            return "Июнь"
        }else if(month==="07"){
            return "Июль"
        }else if(month==="08"){
            return "Август"
        }else if(month==="09"){
            return "Сентябрь"
        }else if(month==="10"){
            return "Октябрь"
        }else if(month==="11"){
            return "Ноябрь"
        }else if(month==="12"){
            return "Декабрь"
        }
    }
    function determineDates(date){
        let arr = [];
        const day = date.split('T')[0].split('-')[2];
        arr.push(day)
        const month = date.split('T')[0].split('-')[1];
        arr.push(determineMonth(month));
        const year = date.split('T')[0].split("-")[0];
        arr.push(year)
        return setDate(arr)
    }
    useEffect(()=>{
        determineDates(props.review.createdAt);
    },[]);
    return(
        <div className="review">
            <div className="user">
                <p className="user__name">{props.review.userName}</p>
                {date? (<p className="user__date">{date[0]} {date[1]} {date[2]}</p>):""}
            </div>
            <div className="userRate">
                <div className="userRate__stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
                <span className="rateNumber">{props.review.rate}</span>
            </div>
            <ReviewItem title={"Преимущества"} text={props.review.advantages}/>
            <ReviewItem title={"Недостатки"} text={props.review.disadvantages}/>
            <ReviewItem title={"Комментарий"} text={props.review.comment}/>
            {/*{props.review.reviewItem.map((item, index)=>

            )}*/}
        </div>
    )
}