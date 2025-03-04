import React from 'react'

import style from "./MainSlider.module.css"
import slider1 from "../../assets/S3-1.jpg"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import slider4 from "../../assets/grocery-banner.png"
import slider5 from "../../assets/grocery-banner-2.jpeg"

import  Slider from 'react-slick';

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed:1100,
    arrows : false ,


  };

  return(
  <>
<div className="row m-auto lg:w-[90%] w-full mb-5 mt-0">
  <div className='w-3/4 '>
  <Slider {...settings}>
 <img src={slider4} alt="freshcart" className='w-full lg:h-[400px] h-[250px] lg:object-cover object-fill'/>
 <img src={slider1} alt="freshcart" className='w-full lg:h-[400px] h-[250px] lg:object-cover object-fill'/>
  <img src={slider5} alt="freshcart" className='w-full lg:h-[400px] h-[250px] lg:object-cover object-fill'/>
</Slider>
  </div>
  <div className='w-1/4'>
   <img src={slider2} alt="freshcart" className='w-full lg:h-[200px] h-[125px] lg:object-cover object-fill'/>
  <img src={slider3} alt="freshcart" className='w-full lg:h-[200px] h-[125px] lg:object-cover object-fill'/>
  </div>
</div>
  </>

  )
}
