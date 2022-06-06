import "./deviceFromDeviceBlock.scss";
import compareImg from "./imgs/compare.svg";
import favouriteSvg from "./imgs/favourites.svg"

export default function DeviceFromDeviceBlock(props) {
    return(
        <div className="device">
            <div className="device__preview" style={{background: 'url('+process.env.REACT_APP_STATIC_URL+props.device.img+')center no-repeat', backgroundSize: "contain"}}>{/*<img src={"http://localhost:3002/"+props.device.img} alt=""/>*/}</div>
            <p className="device__name">{props.device.name}</p>
            <div className="reviewsDeviceBlock">
                <div className="reviewsDeviceBlock__star"></div>
                <span className="reviewsDeviceBlock__averageRating">{props.device.rating}</span>
                <span className="reviewsDeviceBlock__ratingsNumber">{props.device.ratingsNumber} отзывов</span>
            </div>
            <div className="price">
                <p className="price__newPrice">{props.device.newPrice}.-</p>
                <p className="price__oldPrice">{props.device.price}</p>
            </div>
            <div className="actions">
                <button className="actions__item actions__item_main toBasket"><p>В корзину</p></button>
                <button className="actions__item actions__item_secondary compare"><img src={compareImg} alt=""/></button>
                <button className="actions__item actions__item_secondary favourites"><img src={favouriteSvg} alt=""/></button>
            </div>
        </div>
    )
}