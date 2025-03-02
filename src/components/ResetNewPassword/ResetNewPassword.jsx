import React, { useContext, useState } from 'react'
import style from "./ResetNewPassword.module.css"
  import { useFormik } from "formik" ;
  import axios from "axios";
  import { useNavigate} from "react-router-dom";
  import * as yup from "yup";
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';
  

  
  




export default function ResetNewPassword() {
  let {userLogin , setuserLogin} = useContext(UserContext)

  const [isLoading, setisLoading] = useState(false);
  const [ApiError, setApiError] = useState("");

  
   let navigate= useNavigate();
  

  
async function handleNewPassword(){
    setisLoading(true);
  
    let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formik.values)
console.log(response)

if (response.status == 200) {
      console.log(response);
      localStorage.setItem("userToken", response.data.token);
      setuserLogin(response.data.token);

      navigate("/login");
    }

    else{
      toast.error(response.statusText)
    }
      // .then((res) => {
      //   setisLoading(false);
      //   console.log(res);
  
      //   if (res.data.statusMsg == "success") {
      //     console.log(res);
      //     localStorage.setItem("userToken", res.data.token);
      //     setuserLogin(res.data.token);
  
      //     navigate("/login");
      //   }
      // })
      // .catch((err) => {
      //   console.error(err);
      //   setisLoading(false);
      //   setApiError(err.response?.data?.message || "An error occurred");
      // });
  };
  
  
  
    let myValidation = yup.object().shape({

      newPassword : yup.string().required("password is required").min(6,"min length is 6")
    
    })
    


    
  let formik = useFormik({
    initialValues : {
  
      email: "",
      newPassword : "" , 
     
    },

    validationSchema : myValidation ,

    onSubmit : ()=>handleNewPassword() ,
  });
  

    return(
    <>
  
  
  
  <h2 className='font-bold text-2xl text-center my-4 text-emerald-700 mt-16 mb-12' > Account Recovery </h2>
  
   <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto">
  
  
   <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-base text-teal-700  duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">Email address</label>
 
 
      {formik.errors.email && formik.touched.email?       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>: null}
 
 
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
      
  className="block py-2.5 px-0 w-full text-sm text-teal-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-700-600 peer" placeholder=" " required />
      <label htmlFor="newPassword" className="peer-focus:font-medium left-0 absolute text-base text-teal-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-700-600 peer-focus:dark:text-teal-700-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">New Password</label>
  
      {formik.errors.newPassword && formik.touched.newPassword? 
       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.newPassword}</span> 
</div>: null}
  
  </div>
  
  
  
  
  
  
  
  
  
  
  
  
    <div className='flex gap-4 items-center'>
  
   <button type="submit" className="mt-3 text-teal-700 bg-green-100 hover:bg-teal-700 hover:text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center">
Reset Password
     </button>
  
  
    </div>
  
  
   
  
    </form>
    </>
    )
  }