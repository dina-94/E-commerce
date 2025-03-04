import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';







export default function Cart() {


let headers = {
  token : localStorage.getItem("userToken")
}

let {getUserCart , updateCount , deleteCitem}= useContext(CartContext);

const [cartDetails, setcartDetails] = useState(null)
const [isLoading, setisLoading] = useState(false)
const [deleteLoading, setdeleteLoading] = useState(false)
const [cId, setcId] = useState(0)



async function getCartItems(){

  setisLoading(true)

 let response =await getUserCart();
 console.log(response.data.data)

 if(response.data.status == "success"){
setisLoading(false)
  setcartDetails(response.data)
  console.log(response.data.data)
  console.log(response.data)
 }
 else{
  setisLoading(false)

  console.log(response.data.status)

 }

}

async function clearUserCart(){

  let response = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{headers,})
  console.log(response)

  if(response.data.message == "success"){
    getCartItems();
  }

}




async function updateProductC(id , newCount){
  let response = await updateCount(id , newCount);

  if(response.data.status == "success"){
    setcartDetails(response.data)
    toast.success("data updated successfully");

    
   }
   else{
    toast.error("faild to update data");

   }
}

async function deleteCartI(id) {
  setdeleteLoading(true)
  setcId(id)
  let response = await deleteCitem(id);
  console.log(response.data)

     
  if(response.data.status=="success"){
    setcartDetails(response.data)

    toast.success("product removed successfully");
    setdeleteLoading(false)

  }
else{
  toast.error("faild to remove product");
    setdeleteLoading(false)

}

}

useEffect(()=>{
  getCartItems()
}, [])

  return (
  <>

{isLoading? <> <div className='min-h-screen justify-center content-center row m-auto w-1/2 '>  <div className="spinner"> </div></div> 
  </> : <> {cartDetails?.data?.products.length > 0 ?
   <div  className='w-full min-h-screen '>
  <div className='lg:w-[90%] m-auto w-full mt-16 rounded-lg'>

<h1 className='font-bold text-4xl text-green-500 items-center pb-6'>My Cart <i className="fa-solid fa-cart-plus" style={{color: '#22c55e'}}></i> </h1>

<div className="row mt-6 lg:flex-row flex-col mb-5 bg-green-50 items-center rounded-2xl lg:justify-between w-[95%] lg:w-[80%]  m-auto">
  

<div>
 <h2 className='font-bold text-2xl text-green-600 py-3 text-left'> <span className=' text-zinc-700 font-bold text-2xl'>Total Price =</span> {cartDetails.data.totalCartPrice} EGP</h2>
 <h2 className='font-bold text-2xl text-green-600 py-3 text-left'> <span className=' text-zinc-700 font-bold text-2xl'>Total number of items : </span> {cartDetails.numOfCartItems}</h2>
 
</div>

<div>
<Link  to={`/checkout`}>
<button className='btn  text-xl m-1'>Check Out <i className="fa-solid fa-money-check text-xl"/></button>
</Link>

<button onClick={()=>clearUserCart()} className='btn text-xl m-1 hover:bg-red-600'>Clear Cart Items <i className="fa-solid fa-trash-can"/></button>


</div>







</div>



{cartDetails?.data?.products?.map((product)=>

   <div key={product.product.id} className='row border bg-emerald-50 lg:w-[80%] lg:mb-4  mb-4 rounded-xl border-green-300 lg:flex-row flex-col w-[95%] p-20 items-center m-auto' >
 <div className='mx-5 p-5 lg:mx-10 lg:p-0'> 
    <img src={product.product.imageCover} alt="freshcart" className=' m-auto lg:w-[200px] lg:h-[260px] object-cover ' />
  </div>
<div className='flex flex-col px-2 lg:text-left capitalize lg:mx-10 lg:w-1/2 w-[85%] '>
  <h2 className='text-2xl font-semibold'>{product.product.title}</h2>
  <h3 className='text-xl font-semibold p-2 text-green-500'>{product.price} EGP</h3>
  <div className='flex flex-row items-center justify-center m-1'>
    <button onClick={()=>{deleteCartI(product.product.id)}} className='text-white bg-green-600 hover:text-white hover:bg-red-600 p-1 pe-2 rounded-lg w-[30%]'> 
      {deleteLoading && cId==product.product.id ?<i className="fas fa-spinner fa-spin"></i> :<div><i className="fa-solid fa-trash-can p-2" style={{color: 'white'}} />Remove</div>}
      </button>
  </div>
  

</div>


<div className="flex px-10 lg:text-right lg:m-auto m-2">
            <button
             onClick={()=>updateProductC(product.product.id ,product.count - 1 )}
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-500 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">   {product.count}</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
            {product.count}      
                  </div>

            <button 
                         onClick={()=>updateProductC(product.product.id ,product.count + 1 )}

            className="inline-flex items-center justify-center h-8 w-8 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-500 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only"></span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>


</div>

)}

</div>
</div>: <div className="row items-center mt-16"><h3 className=' bg-gray-50 w-[80%] mt-16 rounded-lg m-auto font-semibold text-3xl p-40 text-gray-600'> Your Cart Is Empty <i className="fa-solid fa-hourglass fa-lg mt-6" style={{color: '#59ee8d'}} /></h3></div>} </>
}

  </>
  )
}
