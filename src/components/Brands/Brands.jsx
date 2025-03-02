import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'



export default function Brands() {
const [brands, setbrands] = useState([])

function getBrands(){

  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  .then((res)=>{console.log(res.data.data)
    setbrands(res.data.data)
  })
  .catch((err)=>{console.log(err)})
}

useEffect(()=>{getBrands()},[])


  return(
  <>

  <div className=' text-center w-8/12 lg:w-1/4 m-auto lg:mt-16 lg:mb-10 mt-12 rounded-md  hover:cursor-default bg-gradient-to-r from-green-400 to-green-50 hover:scale-110 transition-transform duration-500'> <h2 className=' bg-gradient-to-r from-slate-500 to-slate-900 text-transparent bg-clip-text p-5 font-semibold text-4xl'> All Brands </h2>
  </div>
 
 <div className="row w-[90%] m-auto ">

 {brands.length>0 ? brands.map((brand)=> 
 <div key={brand._id} className='w-full lg:w-1/4 md:w-1/2'>

 <div className='brand p-2 m-2 mb-5 text-center rounded-md hover:shadow-green-300 hover:transition-shadow duration-500 hover:shadow-lg border-2'>

<img src={brand.image} alt="freshcartbrands" className='w-full'/>
<h3 className='text-green-600 px-4 mt-2 mb-3 text-xl'>{brand.name}</h3>

</div>

</div>): <div className='min-h-screen mx-auto content-center'>  <div className="spinner"> </div></div>}
  </div>


  </>
  )
}
