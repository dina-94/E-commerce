import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';
import toast from 'react-hot-toast';






export default function ProductDetails() {

  const [sproduct, setsproduct] = useState(null)
  const [relatedproducts, setrelatedproducts] = useState([])
  const [Loading, setLoading] = useState(false)
  const [Loading1, setLoading1] = useState(false)
const [currentId, setcurrentId] = useState(0)
let {addProductToCart}= useContext(CartContext)
let{ deleteWishListI  , addProductToWishList }= useContext(WishListContext)
const [isRed, setisRed] = useState([])
const [wishArray, setwishArray] = useState(localStorage.getItem("Array", []))



  var settings = {
    dots: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : false,
    autoplaySpeed:1000,
    arrows : false ,
  };

let {id , category}=useParams()


function getProduct(id){

 axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 .then((res=>{
  console.log(res.data.data)
  setsproduct(res.data.data)}))
 .catch((res)=>{
  console.log(res)
 })

}


function getAllproducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res)=>{
  
    let related = res.data.data.filter((sproduct)=>sproduct.category.name==category)
    setrelatedproducts(related)
  
  })
  .catch((res)=>{})
}


async function addToCart(id){
  setcurrentId(id)
  setLoading1(true)
  let response = await addProductToCart(id);



if ( response.data.status=="success"){
  setLoading1(false)
toast.success(response.data.message);


}

else{
  setLoading1(false)

  toast.error(response.data.message);
  
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
useEffect(()=>{
  getProduct(id), getAllproducts()},[id , category ])
   

  return (
  <>

<div className="row items-center h-[650px] lg:min-h-screen lg:mt-0 mt-4 m-auto w-[80%] ">



<div className="w-full lg:h-auto lg:w-1/4 mt-4 ">
<Slider  {...settings}>


{sproduct?.images?.map((image)=>
<img src={image} alt="freshcart" className=' w-full lg:h-full h-[300px] object-cover m-auto'/>
)}


</Slider>

</div>


<div className="w-full lg:w-3/4 text-left p-4 ">
<h3 className='font-semibold text-3xl mb-2 capitalize '>{sproduct?.title}</h3>
<h4 className='mb-4 text-gray-600 '>{sproduct?.description}</h4>
<h4 className='mt-2 mb-1 text-emerald-500'>{sproduct?.category.name}</h4>

<div className='flex justify-between mb-4'>
<span className='px-1 font-semibold '> {sproduct?.price} EGP</span>
  <span className='px-1'> {sproduct?.ratingsAverage}<i className='fas fa-star text-yellow-400 px-1'></i></span>
  </div>

<div className="row flex flex-col gap-2 items-center mt-10">
   <button onClick={()=>{addToCart(sproduct.id)}} className='text-white bg-green-600 rounded-lg py-2 w-full px-2 lg:w-[50%] '>
    {Loading1 &&  currentId==sproduct.id ?<i className="fas fa-spinner fa-spin"></i>: <div><i className="fa-solid fa-cart-plus" style={{color: '#fcfcfc'}}></i> Add To Cart</div>}
    </button>

  <button onClick={()=>{addToWishList(sproduct.id)}} className='text-white bg-green-600 rounded-lg py-2 px-2 w-full lg:w-[50%] '>
    {Loading &&  currentId==sproduct.id ?<i className="fas fa-spinner fa-spin"></i>:<h3><i className="fa-solid fa-heart" style={{color: isRed[sproduct?.id]==true? 'red' : 'white'}}></i> Add To Wishlist </h3>}
    </button></div>
 
  
</div>








</div>



<div>
<h2 className='text-3xl font-bold text-green-600 mt-12 lg:mt-0 m-auto lg:text-left mb-3 lg:ms-28'>Related Products</h2>


<div className="row w-[90%] m-auto">

 {relatedproducts.length>0 ? relatedproducts.map((product)=> 
 <div key={product.id} className='w-full  lg:h-full  lg:w-1/4 md:w-1/2 '>
 <div className=' border border-spacing-2 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-green-500/20   border-green-300 p-2 h-[600px] lg:h-full product mx-2 my-2 m-auto text-left rounded-md  hover:transition-shadow duration-500 '>
   <Link to = {`/productdetails/${product.id}/${product.category.name}`}>

  <img src={product.imageCover} alt="products"  className='h-[400px] lg:h-full w-full m-auto object-cover'/>
  <h3 className='text-green-700 px-4 mt-2'>{product.category.name}</h3>
  <h3 className='text-black font-semibold mb-3 px-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
  <div className='flex justify-between px-3'>

<span className='px-2'> {product.price} EGP</span>
  <span className='px-2'> {product.ratingsAverage}<i className='fas fa-star text-yellow-400 px-1'></i></span>

  </div>
  </Link>
  <button onClick={()=>{addToCart(product.id)}} className=' btn '>
    {Loading1 &&  currentId==sproduct.id ?<i className="fas fa-spinner fa-spin"></i>: "Add To Cart"}
    </button>

  <button onClick={()=>{addToWishList(product.id)}} className=' btn mt-2'>
    {Loading &&  currentId==product.id ?<i className="fas fa-spinner fa-spin"></i>:<h3>Add To Wishlist <i className="fa-solid fa-heart" style={{color: isRed[product.id]==true? "red" : "white" }}></i></h3>}
    </button>
  </div> 
  
  </div>
 ) : <div className='min-h-screen mx-auto content-center'>  <div className="spinner"> </div></div>}

</div>
</div>

  </>
  )

}