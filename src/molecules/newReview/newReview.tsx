import {FC, useState, useCallback, ChangeEvent, KeyboardEvent, useEffect, MouseEvent} from 'react';
import FormInput from "../../atoms/formInput/formInput";
import {IError} from "../../types/types";
import "./newReview.scss"
import {sendNewReview} from "../../http/userAPI";

interface IValues {
    rating: number | string;
    advantages: string;
    disadvantages: string;
    comment: string;
}

interface INewReviewProps {
    name: string;
    id: number;
    closeSetter: ()=> void;
}

const NewReview:FC<INewReviewProps> = ({name, id, closeSetter}) => {
    const [userError, setUserError] = useState<IError[]>([])

    const [values, setValues] = useState<IValues>({rating: "", advantages: "", disadvantages: "", comment: ""})

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleBigChange(value: string | number, inputName: string) {
        setValues({
            ...values,
            [inputName]: value
        })
    }

    function hideUserError(formInput: string) {
        for (let i = 0; i < userError.length; i++){
            if (userError[i].formInput === formInput){
                let arr = userError;
                arr.splice(i, 1)
                setUserError(arr)
                forceUpdate();
            }
        }
    }
    function showUserError(formInput: string, errorMessage: string){
        let prev;

        userError.map((item)=>{
            if (item.formInput===formInput){
                prev=true
            }
        })
        if (prev){
            return
        }
        let obj = {
            error: errorMessage,
            formInput: formInput
        }
        let errors = userError;
        errors.push(obj);
        setUserError(errors)
        forceUpdate();
    }
    function advantagesValidation(){
        values.advantages?hideUserError("advantages"):showUserError("advantages", "Поле не может быть пустым")
    }
    function disadvantagesValidation(){
        values.disadvantages?hideUserError("disadvantages"):showUserError("disadvantages", "Поле не может быть пустым")
    }
    function ratingValidation(){
        values.rating?hideUserError("rating"):showUserError("rating", "Поле не может быть пустым")
    }
    function commentValidation(){
        values.comment?hideUserError("comment"):showUserError("comment", "Поле не может быть пустым")
    }

    function allValidations(){
        ratingValidation();
        advantagesValidation();
        disadvantagesValidation();
        commentValidation();
    }

    useEffect(()=>{
        let regex = /[0-5]/;
        let a = regex.test(String(values.rating).toLowerCase());
        if (!a){
            handleBigChange("", "rating")
        }
    }, [values.rating])

    async function send(){
        allValidations();
        if (userError.length<1){
            let data = await sendNewReview(values.rating, id, values.advantages, values.disadvantages, values.comment )
            console.log(data)
            console.log("Great, success!")
            closeSetter();
        }
        else{
            console.log("Nope")
        }
    }

    // компонент должен отправлять рэйтинг от 0 до 5, преимущества, недостатки, комментарий

    return (
        <>
            <h2 className="newReview-container__title">Отзыв на {name}</h2>
            <FormInput errors={userError} name={"rating"} value={values.rating || ""} placeholder={"Ваш рейтинг (в цифрах от 0 до 5)"} input={false} width={27} height={3} inputType={""} required={true} setter={handleChange} maxLength={1}/>
            <FormInput errors={userError} name={"advantages"} value={values.advantages} placeholder={"Преимущества"} input={false} width={27} height={7} inputType={""} required={true} setter={handleChange}/>
            <FormInput errors={userError} name={"disadvantages"} value={values.disadvantages} placeholder={"Недостатки"} input={false} width={27} height={7} inputType={""} required={true} setter={handleChange} />
            <FormInput errors={userError} name={"comment"} value={values.comment} placeholder={"Комментарий"} input={false} width={27} height={13} inputType={""} required={true} setter={handleChange}/>
            <button className="newReview-container__sendBtn" onClick={send}><h3>Отправить</h3></button>
        </>
    );
};

export default NewReview;