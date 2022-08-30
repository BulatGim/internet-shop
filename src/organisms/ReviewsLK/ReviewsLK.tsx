import {useContext, useEffect, useState} from 'react';
import SliderSomeItems from "../SliderSomeItems/SliderSomeItems";
import Review from "../../molecules/review/review";
import {IReview} from "../../types/types";
import {fetchSomeData} from "../../http/userAPI"
import {Context} from "../../index";
import "./ReviewsLK.scss"

const ReviewsLk = () => {
    let context = useContext<any>(Context)
    const [reviews, setReviews] = useState<IReview[]>([])
    useEffect(()=>{
        fetchSomeData("rating/user/" + context.user.user.id, setReviews)
    },[])
    return (
        <div className="reviews">
            <h3 className="reviews__title">Ваши отзывы</h3>
            <div className="yoursReviews">
                <SliderSomeItems arrayItems={reviews.map((item) =>
                    <Review key={item.id} review={item}/>
                )}/>
            </div>
        </div>
    );
};

export default ReviewsLk;