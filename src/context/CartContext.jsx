import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'




export let CartContext = createContext();

export default function CartContextProvider(props) {

  const [cartId, setcartId] = useState(0)
  const [carNum, setcarNum] = useState(0)


    let headers = { 
        token : localStorage.getItem("userToken")
    }



function addProductToCart(productId){

return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId : productId }, 
 { headers,})
 .then((res)=>{
  getUserCart()
  return res})
 .catch((err)=>err)

}



function getUserCart(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers,})
  .then((res)=>{
    setcarNum(res.data.numOfCartItems)
    setcartId(res.data.data._id)
    
   return res ;
   
  })
  .catch((err)=>err)
}



function updateCount(productId , newCount){
return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count : newCount},{headers,})
.then((res)=>res)
.catch((err)=>err)
}


 function deleteCitem(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers,})
  .then((res)=>res)
.catch((err)=>err)
}



function checkout(cartId , url ,formData){
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
   {shippingAddress :formData} , {headers,})
.then((res)=>res)
.catch((err)=>err)
}


function getAllord(userId){

  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  .then((res)=>res)
  .catch((err)=>err)

}

useEffect(() => {
  getUserCart() }, [])

  return (

  <>
  <CartContext.Provider value = {  {deleteCitem , updateCount, addProductToCart, getUserCart, checkout , cartId , carNum, getAllord  , setcartId}  }>

{props.children}

  </CartContext.Provider>
  
  </>
    
  )
}
