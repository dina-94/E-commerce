import React from 'react' ;
import style from "./Login.module.css" ;
import { useFormik } from "formik" ;
import * as yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useState , useContext } from 'react';
import { UserContext } from '../../context/UserContext';




export default function Login() {



  let {userLogin , setuserLogin} = useContext(UserContext)

  const navigate = useNavigate();

const [ApiError, setApiError] = useState("");
const [isLoading, setisLoading] = useState(false);


 function handleLogin( values){

setisLoading(true);

 axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
 .then((res)=>{

   setisLoading(false)
   if(res.data.message == "success") {
    console.log(res.data)
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
  email : yup.string().email("not valid email").required("email is required"),
  password : yup.string().required("password is required").min(6,"min length is 6")

})



let formik = useFormik({
  initialValues : {
    email:"",
    password:""
  },
 

validationSchema : myValidation ,


  onSubmit : handleLogin ,
});


  return(
  <>

{ApiError? <div className='w-1/3 rounded mx-auto bg-emerald-500 text-white p-1 m-4'> {ApiError}</div>: null}

<div className='w-10/12 lg:w-5/12 m-auto bg-gradient-to-r from-blue-500/30 to-green-500/30 mt-16 lg:mt-20 rounded-3xl'>
  <form onSubmit={formik.handleSubmit} className=" mx-auto border py-14 px-6 rounded-3xl shadow-lg shadow-green-200">
  <h2 className='    font-bold text-3xl text-center mt-2 mb-6 text-green-600'>Welcome to Fresh Cart <i className="fa-solid fa-face-smile-beam" style={{color: '#0E9447'}} /></h2>

  <h2 className=' font-semibold text-3xl text-green-700 p-4 mb-10'>Login Now </h2>
  <div className="relative z-0 w-full mb-12 mt-4 group">
      <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-2xl text-green-900  duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">Email address</label>
 
 
      {formik.errors.email && formik.touched.email?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>: null}
 
 
  </div>



  <div className="relative z-0 w-full mb-8 group ">
      <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-2xl text-green-900   duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">Enter your password</label>
  
      {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 " role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>: null}
  
  </div>


<div className='text-left pb-3 text-green-700 hover:text-blue-700'>

<Link to={"/forgotpassword"}> Forgot Password ?</Link>

</div>

  <div className='flex gap-4 items-center lg:flex-row flex-col'>

 <button type="submit" className="text-teal-700 bg-teal-100 hover:bg-teal-700 hover:text-teal-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
   { isLoading ? <i className='fas fa-spinner fa-spin'></i>  : "Login"}
    </button>


<Link to={"/register"}> <span className="text-emerald-700 underline hover:text-blue-700">don`t have an account?Register Now</span></Link>
  </div>


 

  </form>
</div>
 





  </>
  )
}

