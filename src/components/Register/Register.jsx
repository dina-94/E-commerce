import React from 'react' ;
import style from "./Register.module.css" ;
import { useFormik } from "formik" ;
import * as yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useState , useContext } from 'react';
import { UserContext } from './../../context/UserContext';




export default function Register() {

  let { userLogin , setuserLogin } = useContext (UserContext);




  const navigate = useNavigate();

const [ApiError, setApiError] = useState("");
const [isLoading, setisLoading] = useState(false);


 function handleRegister( values){

setisLoading(true);

 axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
 .then((res)=>{
   setisLoading(false)
   if(res.data.message == "success") {
    localStorage.setItem("userToken" , res.data.token)
    setuserLogin(res.data.token)
    navigate("/")
   }


  })
 .catch((res)=>{
  setisLoading(false)
  
  setApiError(res.response.data.message);


 })






}

let myValidation = yup.object().shape({
  name : yup.string().min(3,"min length is 3").max(10 , "max length is 10").required("name is required"),
  email : yup.string().email("not valid email").required("email is required"),
  password : yup.string().required("password is required").min(6,"min length is 6"),
  rePassword : yup.string().oneOf([ yup.ref("password")] , "not matched with password").required("repassord is required") ,
  phone : yup.string().matches(/^01[1250][0-9]{8}$/,"phone is not valid").required("phone is required")
})



let formik = useFormik({
  initialValues : {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },
 

validationSchema : myValidation ,


  onSubmit : handleRegister ,
});




  return(
  <>

{ApiError? <div className='w-1/3 rounded mx-auto bg-emerald-500 text-white p-1 m-4'> {ApiError}</div>: null}

<h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>Register Now </h2>

 <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  
{formik.errors.name && formik.touched.name?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div>: null}
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
 
 
      {formik.errors.email && formik.touched.email?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>: null}
 
 
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
  
      {formik.errors.password && formik.touched.password?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>: null}
  
  </div>


  <div className="relative z-0 w-full mb-5 group">
      <input type="rePassword" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter repassword</label>
  
      {formik.errors.rePassword && formik.touched.rePassword?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span> 
</div>: null}
  
  </div>


  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
  
      {formik.errors.phone && formik.touched.phone?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.phone}</span> 
</div>: null}
  
  
  </div>

  <div className='flex gap-4 items-center'>

 <button type="submit" className="text-teal-700 bg-teal-100 hover:bg-teal-700 hover:text-teal-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
   { isLoading ? <i className='fas fa-spinner fa-spin'></i>  : "Register"}
    </button>


<Link to={"/login"}> <span className="text-emerald-700 underline hover:text-blue-700">Have an account already?Login Now</span></Link>
  </div>


 

  </form>
  </>
  )
}
