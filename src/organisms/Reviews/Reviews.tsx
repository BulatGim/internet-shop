import Review from "../../molecules/review/review"
import {FC} from "react"
import {IReview} from "../../types/types";

import "./Review.scss"


interface IReviewsProps {
    reviews: Array<IReview>;
    generalRate?: {
        ratingsNumber: String;
    }
}

/*export default function Reviews(props) {*/

const Reviews: FC<IReviewsProps> = ({reviews, generalRate})=>{
    return(
        <div className="reviews" id="reviews">
            {generalRate ? (
                <div>
                    <div className="header">
                        <h2 className="header__title">Отзывы</h2>
                        <p className="header__amount">{generalRate.ratingsNumber}</p>
                    </div>
                    <div className="stars">
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                    </div>
                </div>
            ):(
                <div className="header">
                    <h2 className="header__title">Отзывы покупателей</h2>
                </div>
            )}
            <div className="reviews__container">
                {reviews && reviews.length ? (reviews.map((review, index) =>
                    <Review key={index} review={review}/>
                )):""}
            </div>
        </div>
    )
}
export default Reviews;