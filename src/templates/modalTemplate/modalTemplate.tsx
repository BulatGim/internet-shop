import {FC, ReactNode, useContext} from 'react';
import "./modalTemplate.scss"
import {Context} from "../../index";

interface IModalTemplateProps {
    children: ReactNode;
    closeSetter: ()=>void;
}

const ModalTemplate: FC<IModalTemplateProps> = ({children, closeSetter}) => {
    function closeModal(e: any){
        if (e.target.getAttribute("data-close-modal")){
            closeSetter();
        }
    }
    return (
        <div className="modalTemplate" data-close-modal="yes" onClick={(e)=>closeModal(e)}>
            <div className="modalTemplate-container">
                {children}
            </div>
        </div>
    );
};

export default ModalTemplate;