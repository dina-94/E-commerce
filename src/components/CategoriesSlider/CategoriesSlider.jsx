import React from 'react'
import style from "./CategoriesSlider.module.css"
import axios  from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from "react-slick";




export default function CategoriesSlider() {


 const [sliderCategories, setsliderCategories] = useState([])



  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay : true,
    autoplaySpeed:1100,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 1000,
    autoplay : true, 
    autoplaySpeed:1100,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
    speed: 1000,
    autoplay : true, 
    autoplaySpeed:1100,
    dots: true,
    infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    
    ]

  };


function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{setsliderCategories(res.data.data)
 
  })
  .catch((res)=>{console.log(res)})
}


useEffect(() => {getCategories()}, [])


  return(
     <>

<Slider  {...settings}>


{sliderCategories?.map((category)=> <div key={category._id} className='items-center'>
<img src={category.image} alt="" className='w-full h-[250px] object-cover'/>


 <h4 className='font-semibold text-2xl text-gray-800'>{category.name}</h4> 
</div>)}





</Slider>
  
  </>

  
  )
}
