import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios'




export default function Categories() {
const [Categories, setCategories] = useState([])

function getCategories(){

  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{console.log(res.data.data)
    setCategories(res.data.data)
  })
  .catch((err)=>{console.log(err)})
}

useEffect(()=>{getCategories()},[])


  return(
  <>

  <div className=' text-center w-8/12 lg:w-1/4 m-auto lg:mt-16 lg:mb-10 mt-12 rounded-md  bg-gradient-to-r from-green-400 to-green-50 hover:scale-110 transition-transform duration-500'> <h2 className=' bg-gradient-to-r from-slate-500 to-slate-900 text-transparent bg-clip-text p-5 font-semibold text-4xl'> All Categories </h2>
  </div>
 
 <div className="row  w-[90%] m-auto">

 {Categories.length>0 ? Categories.map((Category)=> 
 <div key={Category._id} className='w-full lg:w-1/3 md:w-1/2 '>

 <div className='categ m-3 mb-5 items-center text-center rounded-md hover:shadow-green-300 hover:transition-shadow duration-500 hover:shadow-lg border-2'>

<img src={Category.image} alt="freshcartbrands" className='w-full h-[350px] object-cover'/>
<h3 className='text-green-600 px-4 m-4 text-2xl font-semibold'>{Category.name}</h3>

</div>

</div>): <div className='min-h-screen mx-auto content-center'>  <div className="spinner"> </div></div>}
  </div>


  </>
  )
}
