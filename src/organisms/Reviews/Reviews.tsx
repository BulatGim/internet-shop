import Review from "../../molecules/review/review"
import {FC, useContext, useState} from "react"
import {IReview} from "../../types/types";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {LOGIN_ROUTE} from "../../utils/consts";

import "./Review.scss"
import NewReview from "../../molecules/newReview/newReview";
import {Link} from "react-router-dom";

import SliderSomeItems from "../../organisms/SliderSomeItems/SliderSomeItems"


interface IReviewsProps {
    reviews: Array<IReview>;
    generalRate?: string;
    device: {
        id: number;
        name: string;
        img: string;
    }
}
const Reviews: FC<IReviewsProps> = observer(({reviews, generalRate, device})=>{
    const [isNewReviewActive, setIsNewReviewActive] = useState<boolean>(false)
    let user = useContext<any>(Context)
    console.log(user.user)
    return(
        <div className="reviews" id="reviews">
            {generalRate ? (
                <div>
                    <div className="header">
                        <h2 className="header__title">Отзывы</h2>
                        <p className="header__amount">{reviews.length}</p>
                    </div>
                    <div className="stars">
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <div className="stars__item"></div>
                        <p>{generalRate}</p>
                    </div>
                </div>
            ):(
                <div className="header">
                    <h2 className="header__title">Отзывы покупателей</h2>
                </div>
            )}
            <div className="reviews__container">
                {reviews&&reviews.length ? (
                    <SliderSomeItems arrayItems={reviews.map((review, index) =>
                        <Review key={index} review={review}/>
                    )}/> ):(
                    <div className="reviews-noItems">
                        <h2 className="reviews-noItems__text">Пока нет отзывов</h2>
                    </div>
                )}
            </div>
            <div className="reviews-actions">
                {device?(
                    user.user._isAuth?(
                        <button className="reviews-actions__leave" onClick={()=> setIsNewReviewActive(true)}><h3>Оставить отзыв</h3></button>
                    ):(
                        <Link className="reviews-actions__link" to={LOGIN_ROUTE}><h3>Вам необходимо авторизоваться для того, чтобы оставлять отзывы</h3></Link>
                    )
                ):("")}
            </div>
            {isNewReviewActive?(
                <NewReview id={device.id} name={device.name} closeSetter={()=>setIsNewReviewActive(false)}/>
            ):("")}
        </div>
    )
})
export default Reviews;