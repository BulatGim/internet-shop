import {useContext} from 'react';
import Registration from "../registration/registration";
import {Context} from "../../index";
import "./PersonalData.scss"

const PersonalData = () => {
    let context = useContext<any>(Context)
    return (
        <div className="PersonalData">
            <h3 className="PersonalData__title">Редактирование личных данных</h3>
            <Registration valuesProps={context.user.user}/>
        </div>
    );
};

export default PersonalData;