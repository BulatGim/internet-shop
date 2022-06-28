
import "./deviceBlock.scss"
import {IDeviceCard} from "../../types/types";
import {FC} from "react"
import DeviceFromDeviceBlock from "../../molecules/deviceFromDeviceBlock/deviceFromDeviceBlock";
import Review from "../../molecules/review/review";
import SliderSomeItems from "../SliderSomeItems/SliderSomeItems";

interface IDeviceBlockProps {
    title:string;
    deviceBlock: Array<IDeviceCard> | [];
    noDevices?:string;
}

const DeviceBlock: FC<IDeviceBlockProps> = ({ title, deviceBlock, noDevices})=>{
    return(
        <div className="deviceBlock">
            <h3 className="deviceBlock__title">{title}</h3>
                {deviceBlock&&deviceBlock[0]?(
                    <div className="deviceBlock__container">
                        <SliderSomeItems arrayItems={deviceBlock.map((device, index)=>
                            <DeviceFromDeviceBlock key={index} device={device}/>
                        )}/>
                    </div>
                    ):(
                        <div className="deviceBlock-noDevices">
                            <h3 className="deviceBlock-noDevices__description">{noDevices}</h3>
                        </div>
                )}
        </div>
    )
}
export default DeviceBlock;