import {Link} from "react-router-dom";
import "./filter.scss"
import arrowSvg from"./imgs/arrow.svg"
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

export default function Filter(props) {
    const [values, setValues] = useState({})

    let context = useContext(Context)
    let {service} = context;

    function setActiveFilter(typeId, filterName){
        if (!service.activeFilter[filterName]){
            service.setActiveFilter([], filterName)
        }
        let a = context.service.activeFilter[filterName]
        a.push(typeId)
        console.log(context.service.activeFilter)
        service.setActiveFilter(a, filterName)
    }
    function handleInputChange(e){
            setValues({
                ...values,
                [e.target.name + ""]: e.target.checked,
                filterType: e.target.getAttribute("data-filter-type")
            })
    }
    useEffect(()=>{
        let arr = [];
        for (const i in values) {
            let item = values[i];
            arr.push(item)
        }
        if (arr[values.length>2&&(values.length) || 0]){
            setActiveFilter(Number(Object.keys(values)[Object.keys(values).length>2?(Object.keys(values).length - 1):0]),props.filter.filterType)
        }else if(!arr[0]){
            console.log("!arr[0]")
        }
    }, [values])
    const [isFilterActive, setIsFilterActive] = useState(true)
    function handleChange(){
        isFilterActive?(setIsFilterActive(false)):(setIsFilterActive(true))
    }
    let dataAttr = {"data-filter-type":props.filter.filterType}
    return(
        <div className="filter">
            <div className="filterHeader" onClick={()=>handleChange()}>
                <span className="filterHeader__title">{props.filter.title}</span>
                <img className={isFilterActive?("filterHeader__showHide"):("filterHeader__showHide filterHeader__showHide_inactive")} src={arrowSvg} alt=""/>
            </div>
            {isFilterActive?(
                <div>
                    <div className="filter__items">
                        {props.filter.filterItems.map((item,index)=>
                            <div className="filterOption" key={index}>
                                <input {...dataAttr} name={"+"+item.id} className="filterOption__input" type="checkbox" onChange={(e)=>handleInputChange(e)}/>
                                <span className="filterOption__title">{item.name}</span>
                            </div>
                        )}
                    </div>
                    <Link className="filter__link" to={props.filter.page.url}><span>{props.filter.page.title}</span></Link>
                </div>
            ):("")}
        </div>
    )
}