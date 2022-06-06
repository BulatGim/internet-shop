import DeviceFromDeviceBlock from "../../molecules/deviceFromDeviceBlock/deviceFromDeviceBlock";
import "./deviceBlock.scss"
export default function DeviceBlock(props) {

    return(
        <div className="deviceBlock">
            <h3 className="deviceBlock__title">{props.title}</h3>
            <div className="deviceBlock__container">
                {props.deviceBlock?(props.deviceBlock.map((device, index)=>
                    <DeviceFromDeviceBlock key={index} device={device}/>
                )):""}
            </div>
        </div>
    )
}