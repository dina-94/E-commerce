import React from 'react' ;
import { useFormik } from "formik" ;
import axios from "axios";
import { useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';





export default function ForgotPassword() {


 let navigate= useNavigate();


let formik = useFormik({
  initialValues : {

      email: "",
   
  },

  onSubmit : ()=>handleforgetpassword() ,
});

 async function handleforgetpassword(){

 let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formik.values)



 console.log(response)

 if (response.data.statusMsg == "success"){
  navigate("/resetpassword")
  toast.success(response.data.message)

 }

 else{
  toast.success(response.data.message)
 }

  }





  return(
  <>



<h2 className='font-bold text-2xl text-center my-4 text-emerald-700 mt-16 mb-12' > Password Recovery </h2>

 <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto">


  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-xl text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your email</label>
 
 
 
  </div>












  <div className='flex gap-4 items-center'>

 <button type="submit" className="mt-3 text-teal-700 bg-green-100 hover:bg-teal-700 hover:text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center">
Send 
   </button>


  </div>


 

  </form>
  </>
  )
}









