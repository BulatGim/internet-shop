import {FC, ReactNode, useContext} from 'react';
import "./modalTemplate.scss"
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

interface IModalTemplateProps {
    children: ReactNode;
    closeSetter: ()=>void;
}

const ModalTemplate: FC<IModalTemplateProps> = observer(({children, closeSetter}) => {
    const context = useContext<any>(Context)

    function closeModal(e: any){
        if (e.target.getAttribute("data-close-modal")){
            return closeSetter();
        }else{
            return;
        }
    }
    return (
        <div className="modalTemplate" data-close-modal="yes" onClick={(e)=>closeModal(e)}>
            <div className="modalTemplate-container">
                {children}
            </div>
        </div>
    );
});

export default ModalTemplate;