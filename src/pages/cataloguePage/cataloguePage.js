import "./cataloguePage.scss"
import Filter from "../../molecules/filter/filter";
import DeviceFromDeviceBlock from "../../molecules/deviceFromDeviceBlock/deviceFromDeviceBlock";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useLocation, useParams, useRoutes} from "react-router-dom";
import arrow from "./imgs/Arrow 2.svg"
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CataloguePage = observer(()=>{
    let context = useContext(Context)

    const params = useParams()

    const [devices, setDevices] = useState([])

    let {types} = context.devices;
    let {brands} = context.devices;
    let service = context.service

    const [page, setPage] = useState(1)

    const filters =[{
        title:"Тип техники",
        filterItems: types,
        filterType: "typeId",
        page:{
            title: "Все типы техники",
            url:"/",
        }
    },{
        title:"Бренд техники",
        filterItems:brands,
        filterType: "brandId",
        page:{
            title: "Показать все",
            url:"/",
        }
    }
    ]


    const fetchData = async (setter, address) => {
        const result = await axios(
            process.env.REACT_APP_API_URL+""+address
        );
        setter(result.data.rows)
    };

    useEffect(()=>{
        fetchData(setDevices, "device/?typeId="+params.typeId+"&page="+page)
    }, [page])

    function countPages (value){
        let pages = Math.ceil(devices.count/12);
        if (value===0 || value > pages){
            return
        }
        setPage(value)
    }

    const [activeFilter, setActiveFilter] = useState(context.service.activeFilter)

    useEffect(()=>{
        setActiveFilter(context.service.activeFilter)
    }, [context.service.activeFilter])

    useEffect(()=>{
        let activeDevices = devices&&devices.filter((elem)=>{
            let bool = false;
            for (let elemKey in service.activeFilter) {
                console.log(elemKey)
                for (let i = 0; i<service.activeFilter[elemKey].length; i++){
                    /*console.log(i)
                    console.log(service.activeFilter[elemKey][i], elem[elemKey])*/
                    if (service.activeFilter[elemKey][i]===elem[elemKey]){
                        /*console.log(service.activeFilter[elemKey])*/
                        bool = true
                        break
                    }
                }
            }
            if (bool){
                return bool
            }
        });
        console.log(activeDevices);
        setDevices(activeDevices)
    }, [activeFilter])
    useEffect(()=>{
        /*console.log(devices)*/
    }, [devices])

    return(
        <div className="cataloguePage">
            <div className="cataloguePage__filters">
                {filters.map((item,index)=>
                    <Filter key={index} filter={item}/>
                )}
            </div>
            <div className="cataloguePage-devices">
                <div className="cataloguePage-devices__container">
                    {devices ? devices.map((item)=>
                        <DeviceFromDeviceBlock device={item}/>
                    ):("")}
                </div>
                <div className="pagination">
                    <img src={arrow} alt="arrow" className="pagination__prev" onClick={()=> countPages(page-1)}/>
                    <img src={arrow} alt="arrow" className="pagination__next" onClick={()=> countPages(page+1)}/>
                </div>
            </div>
        </div>
    )
})
export default CataloguePage;