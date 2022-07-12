import "./Dialog.scss"
import {useEffect, useState} from "react";
import anonymousPhoto from "./imgs/addresseeAvatar.svg"
import {Link} from "react-router-dom";
import {DIALOG_ROUTE} from "../../utils/consts";

export default function Dialog (props) {
    const [date, setDate] = useState()
    function determineMonth(month){
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
    const determineDates = (date)=>{
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
        determineDates(props.dialog.createdAt)
    }, [])
    return(
        <div className="dialog" >
            <Link className="dialog-link" to={DIALOG_ROUTE+"/"+props.dialog.id}>
                <img src={props.dialog.addresseePhoto?props.dialog.addresseePhoto:anonymousPhoto} alt="" className="dialog__addresseePreview"/>
                <div className="dialog__main">
                    <div className="upperBlock">
                        <h3 className="upperBlock__title">Тема: {props.dialog.title}</h3>
                        {props.dialog.addressee?(
                            <p className="upperBlock__addresseeName">{props.dialog.addressee}</p>
                        ):(<p className="upperBlock__addresseeName">Ищем специалиста....</p>)}
                    </div>
                    <div className="lowerBlock">
                        <span className="lowerBlock__lastMessage">{props.dialog.lastMessage}</span>
                        <span className="lowerBlock__date">{date? (<span>{date[0]} {date[1]} {date[2]}</span>):"" }</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}