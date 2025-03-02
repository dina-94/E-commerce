import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'





export let WishListContext = createContext();

export default function WishListtContextProvider(props) {

  const [wishlistId, setwishlistId] = useState(0)



  let headers = { 
    token : localStorage.getItem("userToken")
}



function addProductToWishList(productId){
return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{productId : productId },{ headers,})
 .then((res)=>
  {  
    // let Array = res.data.data;
    // localStorage.setItem("Array", JSON.stringify(Array));
    // console.log(Array)
    
  return res})
 .catch((err)=>err)

}



function getUserWishList(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers,})
  .then((res)=>{
     
   
   return res ;
   
  })
  .catch((err)=>err)
}






 function deleteWishListI(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers,})
  .then((res)=>{
    console.log(res)
    return res})
.catch((err)=>err)
}



useEffect(()=>{getUserWishList()}, [])




  return (

  <>
  <WishListContext.Provider value = {  { addProductToWishList , getUserWishList , deleteWishListI }  }>

{props.children}

  </WishListContext.Provider>
  
  </>
    
  )
}
