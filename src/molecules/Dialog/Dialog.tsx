import "./Dialog.scss"
import {FC, useEffect, useState} from "react";
import anonymousPhoto from "./imgs/addresseeAvatar.svg"
import {Link} from "react-router-dom";
import {DIALOG_ROUTE} from "../../utils/consts";
import {IDialog} from "../../types/types";

interface IDialogProps {
    dialog: IDialog;
}

const Dialog:FC<IDialogProps> = ({dialog})=> {
    const [date, setDate] = useState< string[] | []>([])
    function determineMonth(month:string):string{
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
            return "Ошибка"
        }
    }
    const determineDates = (date:string)=>{
        let arr:string[]|[] = [];
        const day = date.split('T')[0].split('-')[2];
        arr = [...arr, day]
        const month = date.split('T')[0].split('-')[1];
        arr = [...arr, determineMonth(month)];
        const year = date.split('T')[0].split("-")[0];
        arr = [...arr, year]
        setDate(arr)
    }
    useEffect(()=>{
        determineDates(dialog.createdAt)
    }, [])
    return(
        <div className="dialog" >
            <Link className="dialog-link" to={DIALOG_ROUTE+"/"+dialog.id}>
                <img src={dialog.addresseePhoto?dialog.addresseePhoto:anonymousPhoto} alt="" className="dialog__addresseePreview"/>
                <div className="dialog__main">
                    <div className="upperBlock">
                        <h3 className="upperBlock__title">Тема: {dialog.title}</h3>
                        {dialog.addressee?(
                            <p className="upperBlock__addresseeName">{dialog.addressee}</p>
                        ):(<p className="upperBlock__addresseeName">Ищем специалиста....</p>)}
                    </div>
                    <div className="lowerBlock">
                        <span className="lowerBlock__lastMessage">{dialog.lastMessage}</span>
                        <span className="lowerBlock__date">{date.length>0? (<span>{date[0]} {date[1]} {date[2]}</span>):"" }</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Dialog;