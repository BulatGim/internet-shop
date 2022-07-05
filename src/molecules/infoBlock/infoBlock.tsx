import successImg from "./imgs/accept.png";
import denyImg from "./imgs/sad-face.png"
import "./infoBlock.scss"


import {FC} from 'react';

interface IInfoBlockProps {
    operation: string;
    text:string
}

const InfoBlock:FC<IInfoBlockProps> = ({operation, text}) => {
    return (
        <div className="infoBlock">
            {operation==="success"?(
                <img src={successImg} alt="" className="infoBlock__img"/>
            ):(
                <img src={denyImg} alt="" className="infoBlock__img"/>
            )}
            <p className="infoBlock__text">
                {text}
            </p>
        </div>
    );
};

export default InfoBlock;