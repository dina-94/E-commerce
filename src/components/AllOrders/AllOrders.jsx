import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-hot-toast';




export default function AllOrders() {
 let {getAllord , cartId , setcartId } = useContext(CartContext)
 let { userLogin } = useContext (UserContext)
 const [allOrders, setallOrders] = useState(null)
 const [isLoading, setisLoading] = useState(false)





const decodeToken = (userLogin) => {
  if (!userLogin) {
    console.error("No token provided.");
    return null;
  }

  try {
    const decoded = jwtDecode(userLogin);
    if (decoded && decoded.id) {
      return decoded.id; 
    } 
    else {
      console.warn("Token decoded, but '_id' not found.");
      return "yes";
    }
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return "n";
  }
};


const userId = decodeToken(userLogin);
console.log("User ID:", userId);



async function getAllOrders(){
  setisLoading(true)
  let response = await getAllord(userId);
  

  if (response.status=="200"){
    console.log(response.data)

setallOrders(response.data)
setisLoading(false)
}
else{
toast.error("can`t upload items")
setisLoading(false)

}


}



useEffect(() => {
  getAllOrders()
}, [])


  return<>



 {isLoading? <> <div className='min-h-screen justify-center content-center row m-auto w-1/2 '>  <div className="spinner"> </div></div> 
  </> : 
  <> 
  {allOrders?.length > 0 ?
   <div  className='w-full min-h-screen '>
    
  <div className='lg:w-[95%] m-auto w-full mt-16 rounded-lg '>
{allOrders.map((order)=> order.cartItems.length>0 ?

   <div key={order._id} className='' >

    <div className="row flex-row items-center mt-3 mb-3 border border-spacing-3 p-2 lg:w-[95%] w-[90%] gap-1 m-auto border-green-400 rounded-xl">
     <div className='row flex-row w-full justify-between items-center font-semibold text-2xl p-10 '>
      <h3 className='text-slate-700'>Total Order Price : <span className='text-green-600'>{order.totalOrderPrice} EGP</span></h3>
      <h3 className='text-slate-700'> Payment Method : <span className='text-green-600'>{order.paymentMethodType}</span></h3>

      <h3 className='text-slate-700'>Paid at: <span className='text-green-600'>{new Date(order.paidAt).toLocaleDateString("en-GB")}</span></h3>

      </div> 

{order.cartItems.length> 0 ?order.cartItems.map((item)=>
   
<div key={item._id} className='row flex lg:w-1/4 flex-col m-auto mb-2  bg-green-100 items-center border shadow-md border-spacing-2 border-green-100 rounded-2xl '>


  <div  className=" p-5 lg:p-0  "> 
    <img src={item.product.imageCover} alt="freshcart" className=" m-auto lg:h-[260px] w-full object-cover " />
  </div>

<div className='lg:w-full'>

    <h2 className="text-2xl font-semibold text-slate-700"> {item.product.title.split(" ").slice(0,2).join(" ")}</h2>
<div className="row lg:flex-row flex-col lg:justify-between">
  <h3 className="text-xl font-semibold text-green-500">  {item.price} EGP</h3>  
    <h3 className="text-xl font-semibold  text-black"> {item.product.ratingsAverage}<i className='fas fa-star text-yellow-400 px-1'></i></h3>  
</div>
    
<div className="row lg:flex-row flex-col lg:justify-between">
    <h3 className="text-xl font-semibold text-slate-700">Paid : <span className=' text-green-500'>{order.isPaid ? "Yes" : "No"}</span></h3>
  
  <h3 className="text-xl font-semibold text-slate-700">Delivered : <span className=' text-green-500'>{order.isDelivered ? "Yes" : "No"}</span></h3>
</div>
</div>

</div>


):null
}</div> 
</div>:null)}




</div>
</div>: <div className="row"><h3 className=' bg-gray-50 w-[80%] mt-16 rounded-lg m-auto font-semibold text-3xl p-40 text-gray-600'> Your Orders List Is Empty <i className="fa-solid fa-hourglass fa-lg mt-6" style={{color: '#59ee8d'}} /></h3></div>} </>
} 





  </>
}
