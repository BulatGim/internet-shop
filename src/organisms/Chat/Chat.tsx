import {useEffect, useState} from 'react';
import ModalTemplate from "../../templates/modalTemplate/modalTemplate";
import NewDialogForm from "../newDialogForm/newDialogForm";
import Dialog from "../../molecules/Dialog/Dialog";
import {fetchSomeDataConfig} from "../../http/userAPI";
import {IDialog} from "../../types/types";
import "./Chat.scss"

const Chat = () => {
    const [isNewDialogActive, setIsNewDialogActive] = useState<boolean>(false)
    const [dialogs, setDialogs] = useState<IDialog[]>([])


    useEffect(() => {
        fetchSomeDataConfig("/dialogs", setDialogs)
    }, [isNewDialogActive])
    return (
        <div className="chat">
            <h3 className="chat__title">Ваши диалоги</h3>
            <button className="chat__new" onClick={() => setIsNewDialogActive(true)}><h3>Создать новый чат</h3>
            </button>
            {isNewDialogActive ? (
                <ModalTemplate closeSetter={() => setIsNewDialogActive(false)}>
                    <NewDialogForm closeSetter={() => setIsNewDialogActive(false)}/>
                </ModalTemplate>
            ) : ("")}
            <div className="Dialogs">
                {dialogs.map((dialog) =>
                    <Dialog key={dialog.id} dialog={dialog}/>
                )}
            </div>
        </div>
    );
};

export default Chat;