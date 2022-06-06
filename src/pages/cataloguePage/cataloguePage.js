import "./cataloguePage.scss"
import Filter from "../../molecules/filter/filter";
import pepe from "../DevicePage/imgs/pepe.svg";
import DeviceFromDeviceBlock from "../../molecules/deviceFromDeviceBlock/deviceFromDeviceBlock";

export default function CataloguePage() {
    const filters =[{
        title:"Тип техники",
        filterItems:[{
            title:"Смартфоны"
        },{
            title:"Холодильники"
        },{
            title:"Микроволновки"
        },{
            title:"Компьютеры"
        },
        ],
        page:{
            title: "Все типы техники",
            url:"/",
        }
    },{
        title:"Бренд техники",
        filterItems:[{
            title:"Samsung"
        },{
            title:"Apple"
        },{
            title:"Xiaomi"
        },{
            title:"LG"
        },
        ],
        page:{
            title: "Показать все",
            url:"/",
        }
    }
    ]
    const devices = [{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },{
        preview: pepe,
        title: "Телефон №1 с объемом памяти 16",
        reviews: {
            averageRating: "4,5",
            ratingsNumber: "5"
        },
        price:{
            oldPrice: 54999,
            newPrice: 45999,
        }
    },
    ]
    return(
        <div className="cataloguePage">
            <div className="cataloguePage__filters">
                {filters.map((item,index)=>
                    <Filter key={index} filter={item}/>
                )}
            </div>
            <div className="cataloguePage__devices">
                {devices.map((item, index)=>
                    <DeviceFromDeviceBlock device={item}/>
                )}
            </div>
        </div>
    )
}