import "./reviewItem.scss"
import {FC} from "react";

interface IReviewItemProps {
    title: String;
    text: String;
}

/*export default function ReviewItem(props) {*/
const ReviewItem: FC<IReviewItemProps> = ({title, text})=>{
    return(
        <div className="reviewItem">
            <p className="reviewItem__title">{title}</p>
            <p className="reviewItem__text">{text}</p>
        </div>
    )
}
export default ReviewItem;