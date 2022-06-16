
import "./deviceBlock.scss"
import {IDeviceCard} from "../../types/types";
import {FC} from "react"
import DeviceFromDeviceBlock from "../../molecules/deviceFromDeviceBlock/deviceFromDeviceBlock";

interface IDeviceBlockProps {
    title:String;
    deviceBlock: Array<IDeviceCard>
}

const DeviceBlock: FC<IDeviceBlockProps> = ({ title, deviceBlock})=>{
    return(
        <div className="deviceBlock">
            <h3 className="deviceBlock__title">{title}</h3>
            <div className="deviceBlock__container">
                {deviceBlock?(deviceBlock.map((device, index)=>
                    <DeviceFromDeviceBlock key={index} device={device}/>
                )):""}
            </div>
        </div>
    )
}
export default DeviceBlock;