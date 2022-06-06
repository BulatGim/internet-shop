import {Link} from "react-router-dom";
import "./filter.scss"
import arrowSvg from"./imgs/arrow.svg"
import {useState} from "react";

export default function Filter(props) {
    const [isFilterActive, setIsFilterActive] = useState(true)
    function handleChange(){
        isFilterActive?(setIsFilterActive(false)):(setIsFilterActive(true))
    }
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
                                <input className="filterOption__input" type="checkbox"/>
                                <span className="filterOption__title">{item.title}</span>
                            </div>
                        )}
                    </div>
                    <Link className="filter__link" to={props.filter.page.url}><span>{props.filter.page.title}</span></Link>
                </div>
            ):("")}
        </div>
    )
}