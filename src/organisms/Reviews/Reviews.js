import Review from "../../molecules/review/review"

import "./Review.scss"

export default function Reviews(props) {


    return(
        <div className="reviews" id="reviews">
            {props.generalRate ? (
                <div>
                    <div className="header">
                        <h2 className="header__title">Отзывы</h2>
                        <p className="header__amount">{props.generalRate.ratingsNumber}</p>
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
                {props.reviews && props.reviews.length ? (props.reviews.map((review, index) =>
                    <Review key={index} review={review}/>
                )):""}
            </div>
        </div>
    )
}