import {useEffect, useState, TouchEvent, MouseEvent, FC} from 'react';
import "./Slider.scss";
import arrow from './img/arrow.svg'

interface ISliderProps {
    slides: [string]
}

const Slider: FC<ISliderProps> = ({ slides})=>{
  let img = [];
  for (let i = 0; i< slides.length; i++){
      img.push(<img className="sliderImg" key={slides[i]} src={slides[i]}/>)
  }
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [x3, setX3] = useState<number>(0);
  const [y3, setY3] = useState<number>(0);
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
        //console.log(res)
        return res
    })
    // countIndex(-1);
  }
  // Хук Effect
useEffect(() => {
    // Запускаем интервал
    const interval = setInterval(() => {
        doNextSlide();
    }, 100000)
    // Выключаем интервал
    return () => {
        clearInterval(interval)
    }
}, [])
// Вычисляем индекс предыдущего слайда
const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
// Вычисляем индекс следующего слайда
const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1
//инициализируем переменные для начала ведения отсчета для перелистывания
let x1:number = 0;
let y1:number = 0;
//функция записывающая начало свайпа по координатам x и y
function handleTouchStart(e:TouchEvent<HTMLDivElement>){
  x1 = e.touches[0].clientX;
  y1 = e.touches[0].clientY;
}
function handleTouchMove(e:TouchEvent<HTMLDivElement>){
  if(!x1 || !y1){
    // если не существует начала свайпа, выходим из функци
    return false;
  }
  //каждый раз инициализируется переменная записывающая текущие координаты свайпа
  let x2 = e.touches[0].clientX;
  let y2 = e.touches[0].clientY;
  let xDifference = x2-x1;
  let yDifference = y2-y1
  return calculateCoordinates(xDifference, yDifference)
}
function handleMouseDown(e:MouseEvent<HTMLDivElement>){
  setIsMouseDown(true);
  setX3(e.pageX);
  setY3(e.pageY);
}
function handleMouseMove(e:MouseEvent<HTMLDivElement>){
  if(isMouseDown == true){
    let x4 = e.pageX;
    let y4 = e.pageY;
    e.preventDefault();
    if(Math.abs(x4-x3)>80){
      setX3(x4)
      let xDifference = x4-x3;
      let yDifference = y4-y3;
      return calculateCoordinates(xDifference, yDifference);
    }else{
      return false;
    }
  }
}
function handleMouseUp(e:MouseEvent){
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
    <div className="Slider" onTouchStart={(e)=>handleTouchStart(e)} onTouchMove={(e)=>handleTouchMove(e)} onMouseDown={(e)=>handleMouseDown(e)} onMouseMove={(e)=>handleMouseMove(e)} onMouseUp={(e)=>handleMouseUp(e)} onMouseLeave={(e)=>handleMouseUp(e)}>
        <button className="prevSlide" onClick={doPrevSlide}><img className="prevSlide__img" src={arrow} alt=""/></button>
      <div className="Slider__img Slider__img-prev"
              key={prevImgIndex}>
          {img[prevImgIndex]}
      </div>
      <div className="Slider__img"
              key={activeIndex}>
          {img[activeIndex]}
      </div>
      <div className="Slider__img Slider__img-next"
              key={nextImgIndex}>
          {img[nextImgIndex]}
      </div>
        <button className="nextSlide" onClick={doNextSlide}><img className="nextSlide__img" src={arrow} alt=""/></button>
      <div className='crumbs'>
          {img.map((item, index) =>
            <span key={index} className={(activeIndex == index)?("crumbs__item crumbs__item_active"):("crumbs__item")} onClick={(e)=>switchToGivenSlide(index)}></span>
          )}
      </div>
    </div>
  )
}

export default Slider;
