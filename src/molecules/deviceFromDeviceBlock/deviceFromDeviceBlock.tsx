import "./deviceFromDeviceBlock.scss";
import compareImg from "./imgs/compare.svg";
import favouriteSvg from "./imgs/favourites.svg"
import {FC, FunctionComponent} from "react";
import {IDeviceCard} from "../../types/types";

interface IDeviceCardProps {
    device: IDeviceCard;
}

const DeviceFromDeviceBlock: FC<IDeviceCardProps> = ({device}) => {
    return(
        <div className="device">
            <div className="device__preview" ><img className="device__preview" src={process.env.REACT_APP_STATIC_URL+""+device.img} alt=""/></div>
            <p className="device__name">{device.name}</p>
            <div className="reviewsDeviceBlock">
                <div className="reviewsDeviceBlock__star"></div>
                <span className="reviewsDeviceBlock__averageRating">{device.rating}</span>
                <span className="reviewsDeviceBlock__ratingsNumber">{device.ratingsNumber} отзывов</span>
            </div>
            <div className="price">
                <p className="price__newPrice">{device.newPrice}.-</p>
                <p className="price__oldPrice">{device.price}</p>
            </div>
            <div className="actions">
                <button className="actions__item actions__item_main toBasket"><p>В корзину</p></button>
                <button className="actions__item actions__item_secondary compare"><img src={compareImg} alt=""/></button>
                <button className="actions__item actions__item_secondary favourites"><img src={favouriteSvg} alt=""/></button>
            </div>
        </div>
    )
}
export default DeviceFromDeviceBlock;