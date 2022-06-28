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

    /*const [service, setService] = useState(context.service.activeFilter)*/

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
        setter(result.data)
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

    useEffect(()=>{
        let activeDevices = devices&&devices.rows&&devices.rows.filter((elem)=>{
            for (const elemKey in service.activeFilter) {
                for (const index in service.activeFilter[elemKey]) {
                    console.log(service.activeFilter[elemKey][index], elem[elemKey])
                    return service.activeFilter[elemKey][index]===elem[elemKey];
                }
            }
        });
        console.log(activeDevices);
        setDevices(activeDevices)
        console.log(devices)
    }, [context.service.activeFilter])

    return(
        <div className="cataloguePage">
            <div className="cataloguePage__filters">
                {filters.map((item,index)=>
                    <Filter key={index} filter={item}/>
                )}
            </div>
            <div className="cataloguePage-devices">
                <div className="cataloguePage-devices__container">
                    {devices ? devices.rows&&devices.rows.map((item)=>
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