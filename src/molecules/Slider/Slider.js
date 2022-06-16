import {useEffect, useState} from 'react';
import "./Slider.scss";
import arrow from './img/arrow.svg'
function Slider(props){
  let img = [];
  for (let i = 0; i< props.slides.length; i++){
      img.push(<img className="sliderImg" key={props.slides[i]} src={props.slides[i]}/>)
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [x3, setX3] = useState(null);
  const [y3, setY3] = useState(null);
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
let x1 = null;
let y1 = null;
//функция записывающая начало свайпа по координатам x и y
function handleTouchStart(e){
  x1 = e.touches[0].clientX;
  y1 = e.touches[0].clientY;
}
function handleTouchMove(e){
  if(!x1 || !y1){
    // если не существует начала свайпа, выходим из функци
    return false;
  }
  //каждый раз инициализируется переменная записывающая текущие координаты свайпа
  let x2 = e.touches[0].clientX;
  let y2 = e.touches[0].clientY;
  let xDifference = x2-x1;
  let yDifference = y2-y1
  calculateCoordinates(xDifference, yDifference)
}
function handleMouseDown(e){
  setIsMouseDown(true);
  setX3(e.pageX);
  setY3(e.pageY);
}
function handleMouseMove(e){
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
      return false;
    }
  }
}
function handleMouseUp(e){
    setIsMouseDown(false);
}
function calculateCoordinates(xDiff, yDiff){
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
  function switchToGivenSlide(index){
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
