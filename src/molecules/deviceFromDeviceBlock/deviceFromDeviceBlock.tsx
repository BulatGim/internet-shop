import "./deviceFromDeviceBlock.scss";
import compareImg from "./imgs/compare.svg";
import favouriteSvg from "./imgs/favourites.svg"
import {FC, FunctionComponent, useContext} from "react";
import {IDeviceCard} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {addToBasketAndInform} from "../../http/userAPI";
import {Context} from "../../index";

interface IDeviceCardProps {
    device: IDeviceCard;
}

const DeviceFromDeviceBlock: FC<IDeviceCardProps> = ({device}) => {
    let context = useContext(Context)
    let navigate = useNavigate();
    function selectPage(id: number):void{
        navigate("../device/"+id)
    }
    return(
        <div className="device" >
            <div className="deviceMainInfo" onClick={()=>selectPage(device.id)}>
                <div className="device__preview" ><img className="device__preview" src={process.env.REACT_APP_STATIC_URL+""+device.img} alt=""/></div>
                <p className="device__name">{device.name}</p>
                <div className="reviewsDeviceBlock">
                    <div className="reviewsDeviceBlock__star"></div>
                    <span className="reviewsDeviceBlock__averageRating">{device.rating}</span>
                    <span className="reviewsDeviceBlock__ratingsNumber">{device.ratingsNumber} отзывов</span>
                </div>
                {device.newPrice===0?(
                    <div className="price">
                        <p className="price__newPrice">{device.price}.-</p>
                    </div>
                ):(
                    <div className="price">
                        <p className="price__newPrice">{device.newPrice}.-</p>
                        <p className="price__oldPrice">{device.price}</p>
                    </div>
                )}
            </div>
            <div className="actions">
                <button className="actions__item actions__item_main toBasket" onClick={()=>addToBasketAndInform(device.id, context)}><p>В корзину</p></button>
                <button className="actions__item actions__item_secondary compare"><img src={compareImg} alt=""/></button>
                <button className="actions__item actions__item_secondary favourites"><img src={favouriteSvg} alt=""/></button>
            </div>
        </div>
    )
}
export default DeviceFromDeviceBlock;