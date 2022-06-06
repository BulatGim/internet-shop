import "./Dialog.scss"

export default function Dialog (props) {
    return(
        <div className="dialog">
            <img src={props.dialog.addresseePhoto} alt="" className="dialog__addresseePreview"/>
            <div className="dialog__main">
                <div className="upperBlock">
                    <h3 className="upperBlock__title">Тема: {props.dialog.title}</h3>
                    <p className="upperBlock__addresseeName">{props.dialog.addressee}</p>
                </div>
                <div className="lowerBlock">
                    <span className="lowerBlock__lastMessage">{props.dialog.lastMessage}</span>
                    <span className="lowerBlock__date">{props.dialog.date}</span>
                </div>
            </div>

        </div>
    )
}