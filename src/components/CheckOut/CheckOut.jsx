import React from 'react' ;
import { useFormik } from "formik" ;
import axios from "axios";
import {Link} from "react-router-dom";
import { useState , useContext } from 'react';
import { CartContext } from '../../context/CartContext';




export default function CheckOut() {



let {checkout , cartId} = useContext(CartContext)


let formik = useFormik({
  initialValues : {
      details: "",
      phone: "",
      city: "",
  },

  onSubmit : ()=>handleCheckOut( cartId, `http://localhost:5173%23`) ,
});


 async function handleCheckOut( cartId , url ){


  let {data} = await checkout(cartId , url , formik.values)

  window.location.href = data.session.url


   }



  return(
  <>



<h2 className='font-bold text-2xl text-center my-4 text-emerald-700 mt-16'>Checkout Now </h2>

 <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto">


  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="details" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
 
 
 
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
  
  </div>

  
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
  
  </div>









  <div className='flex gap-4 items-center'>

 <button type="submit" className="mt-3 text-teal-700 bg-green-100 hover:bg-teal-700 hover:text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center">
Checkout 
   </button>


  </div>


 

  </form>
  </>
  )
}

