import ReviewItem from "../../atoms/reviewItem/reviewItem"

import "./review.scss"
import {useState, useEffect, FC} from "react";
import {IReview} from "../../types/types";

/*export default function Review(props){*/
interface IReviewProps {
    review: IReview;
}

const Review: FC<IReviewProps> = ({review})=>{
    const [date, setDate] = useState<Array<any>>()
    function determineMonth(month: string){
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
        }else{
            return alert("Ошибка")
        }
    }
    const determineDates = (date:String)=>{
        let arr = [];
        const day = date.split('T')[0].split('-')[2];
        arr.push(day)
        const month = date.split('T')[0].split('-')[1];
        arr.push(determineMonth(month));
        const year = date.split('T')[0].split("-")[0];
        arr.push(year)
        setDate(arr)
    }
    useEffect(()=>{
        determineDates(review.createdAt);
    },[]);
    return(
        <div className="review">
            <div className="user">
                <p className="user__name">{review.userName}</p>
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
                <span className="rateNumber">{review.rate}</span>
            </div>
            <ReviewItem title={"Преимущества"} text={review.advantages}/>
            <ReviewItem title={"Недостатки"} text={review.disadvantages}/>
            <ReviewItem title={"Комментарий"} text={review.comment}/>
        </div>
    )
}
export default Review;