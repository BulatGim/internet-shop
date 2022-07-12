import {FC, useContext, useEffect, useState} from 'react';
import "./Message.scss";
import {Context} from "../../index";

interface IMessageProps {
    id: number;
    createdAt: string;
    description:string;
    userId: number;
    avatar?:string;
    addresseeName?:string;
}

const Message:FC<IMessageProps> = ({id, description, createdAt, avatar , addresseeName, userId}) => {
    let context = useContext<any>(Context)
    const [date, setDate] = useState<Array<any>>([])
    function determineMonth(month: string){
        if (month === "01"){
            return "Январь"
        }else if(month==="02"){
            return "Февраль"
        }else if(month==="03"){
            return "Март"
        }else if(month==="04"){
            return "Апрель"
        }else if(month==="05"){
            return "Май"
        }else if(month==="06"){
            return "Июнь"
        }else if(month==="07"){
            return "Июль"
        }else if(month==="08"){
            return "Август"
        }else if(month==="09"){
            return "Сентябрь"
        }else if(month==="10"){
            return "Октябрь"
        }else if(month==="11"){
            return "Ноябрь"
        }else if(month==="12"){
            return "Декабрь"
        }else{
            return alert("Ошибка")
        }
    }
    const determineDates = (date:string)=>{
        if (!date){
            return
        }
        let arr = [];
        const day = date.split('T')[0].split('-')[2];
        arr.push(day)
        const month = date.split('T')[0].split('-')[1];
        arr.push(determineMonth(month));
        const year = date.split('T')[0].split("-")[0];
        arr.push(year)
        setDate(arr)
    }
    useEffect(()=>{
        determineDates(createdAt);
    },[]);
    return (
        <div className={userId===context.user.user.id?"message ":"message message_notYours"}>
            {avatar?(<img src={process.env.REACT_APP_STATIC_URL+"/"+avatar} alt=""/>):("")}
            <div className="message-content">
                <p className="message-content__name">{addresseeName?(addresseeName):""}</p>
                <h3 className="message-content__text">{description}</h3>
                <p className="message-content__data">{date[0]} {date[1]}</p>
            </div>
        </div>
    );
};

export default Message;