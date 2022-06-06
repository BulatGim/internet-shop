import "./reviewItem.scss"

export default function ReviewItem(props) {
    return(
        <div className="reviewItem">
            <p className="reviewItem__title">{props.title}</p>
            <p className="reviewItem__text">{props.text}</p>
        </div>
    )
}