import {FC, useEffect, useState, TouchEvent, MouseEvent} from 'react';
import "./SliderSomeItems.scss";
import arrow from './img/arrow.svg'

interface ISliderProps {
    arrayItems: Array<any>
}

const SliderSomeItems: FC<ISliderProps> = ({arrayItems})=>{
    let img = arrayItems/*[
        <img className="slider__imgNew" key={props.slides[0]} src={props.slides[0]} />,
        <img className="slider__imgNew" key={props.slides[1]} src={props.slides[1]} />,
        <img className="slider__imgNew" key={props.slides[2]} src={props.slides[2]} />,
        <img className="slider__imgNew" key={props.slides[3]} src={props.slides[3]} />,
        <img className="slider__imgNew" key={props.slides[4]} src={props.slides[4]} />,
        <img className="slider__imgNew" key={props.slides[5]} src={props.slides[5]} />,
    ]*/
    // Хук Effect
    useEffect(() => {
        // Запускаем интервал
        const interval = setInterval(() => {
            doNextSlide();
        }, 50000000)
        // Выключаем интервал
        return () => {
            clearInterval(interval)
        }
    }, [])
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [x3, setX3] = useState<number >(0);
    const [y3, setY3] = useState<number >(0);
    function doNextSlide(){
        setActiveIndex((current) => {
            // Вычисляем индекс следующего слайда, который должен вывестись
            const res = current === img.length - 1 ? 0 : current+1;
            // Возвращаем индекс
            //console.log(res)
            return res
        })
        //countIndex(1);
    }
    function doPrevSlide(){
        setActiveIndex((current) => {
            // Вычисляем индекс следующего слайда, который должен вывестись
            const res = current === 0 ? img.length - 1 : current-1;
            // Возвращаем индекс
            return res
        })
        // countIndex(-1);
    }

// Вычисляем индекс предыдущего слайда
    const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1;
    const prevImgDouble = prevImgIndex ? prevImgIndex - 1 : img.length - 1;
// Вычисляем индекс следующего слайда
    const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1;
    const nextImgDouble = (activeIndex+1)<img.length?(activeIndex+2)<img.length?(((activeIndex === img.length - 2 ? 0 : activeIndex + 2))):0:1;
//инициализируем переменные для начала ведения отсчета для перелистывания
    let x1: number | null = null;
    let y1: number | null = null;
//функция записывающая начало свайпа по координатам x и y
    function handleTouchStart(e: TouchEvent<any>){
        x1 = e.touches[0].clientX;
        y1 = e.touches[0].clientY;
    }
    function handleTouchMove(e: TouchEvent<any>){
        if(!x1 || !y1){
            // если не существует начала свайпа, выходим из функци
            return;
        }
        //каждый раз инициализируется переменная записывающая текущие координаты свайпа
        let x2 = e.touches[0].clientX;
        let y2 = e.touches[0].clientY;
        let xDifference = x2-x1;
        let yDifference = y2-y1
        calculateCoordinates(xDifference, yDifference)
    }
    function handleMouseDown(e: MouseEvent<any>){
        setIsMouseDown(true);
        setX3(e.pageX);
        setY3(e.pageY);
    }
    function handleMouseMove(e: MouseEvent<any>){
        if(isMouseDown == true){
            let x4 = e.pageX;
            let y4 = e.pageY;
            e.preventDefault();
            if(Math.abs(x4-x3)>80){
                setX3(x4)
                let xDifference = x4-x3;
                let yDifference = y4-y3;
                calculateCoordinates(xDifference, yDifference);
            }else{
                return;
            }
        }
    }
    function handleMouseUp(e: MouseEvent<any>){
        setIsMouseDown(false);
    }
    function calculateCoordinates(xDiff:number, yDiff:number){
        // записываем разницу в координатах
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            //ветка выполняется, когда свайп идет влево или вправо
            if (xDiff>0) {
                doPrevSlide();
            }else {
                doNextSlide();
            }
        }
    }
    function switchToGivenSlide(index:number){
        setActiveIndex(index)
    }
    return(
        <div className="SliderSomeItems" onTouchStart={(e)=>handleTouchStart(e)} onTouchMove={(e)=>handleTouchMove(e)} onMouseDown={(e)=>handleMouseDown(e)} onMouseMove={(e)=>handleMouseMove(e)} onMouseUp={(e)=>handleMouseUp(e)} onMouseLeave={(e)=>handleMouseUp(e)}>
            {/*<button className="prevSlide" onClick={doPrevSlide}><img className="prevSlide__img" src={arrow} alt=""/></button>*/}
            <div className="SliderSomeItems__img SliderSomeItems__img-prevDouble"
                 key={prevImgDouble}>
                {img[prevImgDouble]}
            </div>
            <div className="SliderSomeItems__img SliderSomeItems__img-prev"
                 key={prevImgIndex}>
                {img[prevImgIndex]}
            </div>
            <div className="SliderSomeItems__img SliderSomeItems__img-current"
                 key={activeIndex}>
                {img[activeIndex]}
            </div>
            <div className="SliderSomeItems__img SliderSomeItems__img-next"
                 key={nextImgIndex}>
                {img[nextImgIndex]}
            </div>
            <div className="SliderSomeItems__img SliderSomeItems__img-nextDouble"
                 key={nextImgDouble}>
                {img[nextImgDouble]}
            </div>
            {/*<button className="nextSlide" onClick={doNextSlide}><img className="nextSlide__img" src={arrow} alt=""/></button>*/}
            <div className='SliderSomeItems-crumbs'>
                {img.map((item, index) =>
                    <span key={index} className={(activeIndex === index)?("SliderSomeItems-crumbs__item SliderSomeItems-crumbs__item_active"):("SliderSomeItems-crumbs__item")} onClick={(e)=>switchToGivenSlide(index)}></span>
                )}
            </div>
        </div>
    )
}

export default SliderSomeItems;
