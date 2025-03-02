import React, { useContext, useEffect, useState } from 'react'
import style from "./Recentproducts.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { CartContext } from './../../context/CartContext';
import toast  from 'react-hot-toast';
import { WishListContext } from '../../context/WishListContext';





export default function Recentproducts() {


  let {addProductToCart}= useContext(CartContext)
  let{ deleteWishListI , getUserWishList , addProductToWishList }= useContext(WishListContext)
const [products, setproducts] = useState([])
const [Loading, setLoading] = useState(false)
const [addLoading, setaddLoading] = useState(false)
const [currentId, setcurrentId] = useState(0)
const [wishArray, setwishArray] = useState(localStorage.getItem("Array", []))
const [Query, setQuery] = useState([])
const [isRed, setisRed] = useState([])




function getProducts(){

 axios.get("https://ecommerce.routemisr.com/api/v1/products" )

.then((res)=>{
  setproducts(res.data.data)
})

.catch((res)=>{
console.log(res)
})
}





async function handleSearch(input) {
  try {
    setQuery(input);

    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`);

    const allProducts = res.data.data;
    console.log(allProducts);

    setproducts(allProducts);

    const related = allProducts.filter((product) =>
      product.title && product.title.toLowerCase().includes(input.toLowerCase()));
    


    console.log("data", related);


    

    setproducts(related);
  } 
  catch (error) {
    console.error("error", error);
  }
}




async function addToCart(id){
  setcurrentId(id)
  setaddLoading(true)
  let response = await addProductToCart(id);



if ( response.data.status=="success"){
toast.success(response.data.message);
setaddLoading(false)

}

else{
  toast.error(response.data.message);
  setaddLoading(false)

}

}



async function addToWishList(id){
  setcurrentId(id)
  setLoading(true)

  if (wishArray && !wishArray.includes(id)) {

  
      let response = await addProductToWishList(id);

if( response.data.status=="success"){
 let updatedArray  = response.data.data
 console.log(updatedArray)
   localStorage.setItem("Array",JSON.stringify(updatedArray));
   setwishArray(updatedArray);


   setLoading(false)

   setisRed((prev = {}) => {
    const updated = { ...prev, [id]: true };
    localStorage.setItem("isRed", JSON.stringify(updated));
    return updated;
  });
  

toast.success("product added successfully to your wish list")

}
else{
  toast.error(response.data.message);
  setLoading(false)
}
}

else{



  

let response = await deleteWishListI(id);
console.log(response);

if (response?.data.status === "success") {
  const updatedArray = response.data.data;
  console.log(updatedArray)
  localStorage.setItem("Array", JSON.stringify(updatedArray));
  setwishArray(updatedArray);

  console.log(updatedArray);

  setisRed((prev = {}) => {
    const updated = { ...prev };
    delete updated[id]; 
    localStorage.setItem("isRed", JSON.stringify(updated)); 
    return updated; 
  });

  setLoading(false);

  toast.success("Product removed successfully from your wish list!");
} else {
  setLoading(false);

  toast.error("Failed to remove product. Reason: " + response.data.status);
}
}

}


useEffect(() => {
  const savedIsRed = JSON.parse(localStorage.getItem("isRed")) || {};
  setisRed(savedIsRed);
}, []);

useEffect(()=>{getProducts()} , []) 



  return <>



<div>

<input type="text" placeholder="search"  onChange={(e) => handleSearch(e.target.value)} className="border border-green-300  w-[80%] m-14 p-3 rounded-3xl rounded-5 focus:shadow-lg focus:shadow-green-200 " id="searchValue"/>


</div>


  <h1 className='font-bold text-4xl text-green-600 '>All Products</h1>

<div className="row w-[90%] m-auto">

 {products.length>0 ? products.map((product)=> 
 <div key={product.id} className='w-full lg:w-1/4 md:w-1/2 '>
 <div className='product p-2 m-2 mb-5 text-left border-2 border-green-400 rounded-md hover:shadow-green-300 transition-shadow duration-500 hover:shadow-lg '>
   <Link to = {`/productdetails/${product.id}/${product.category.name}`}>

  <img src={product.imageCover} alt="products"  className='h-[320px] m-auto'/>
  <h3 className='text-green-700 px-4 mt-2'>{product.category.name}</h3>
  <h3 className='text-black font-semibold mb-3 px-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
  <div className='flex justify-between px-3'>

<span className='px-2'> {product.price} EGP</span>
  <span className='px-2'> {product.ratingsAverage}<i className='fas fa-star text-yellow-400 px-1'></i></span>

  </div>
  </Link>
  <button onClick={()=>{addToCart(product.id)}} className=' btn'>
    {addLoading &&  currentId==product.id ?<i className="fas fa-spinner fa-spin"></i>: "Add To Cart"}
    </button>

  <button onClick={()=>{addToWishList(product.id)}} className=' btn mt-2'>
    {Loading && currentId==product.id ?<i className="fas fa-spinner fa-spin" ></i>:<h3>Add To Wishlist <i className="fa-solid fa-heart" style={{color: isRed[product.id]==true? "red" : "white" }}></i></h3>}
    </button>

  </div> 
  
  </div>
 ) : <div className='min-h-screen mx-auto content-center'>  <div className="spinner"> </div></div>}

</div>

  </>
  
}
