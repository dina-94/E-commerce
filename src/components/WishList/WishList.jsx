import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../context/WishListContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';



export default function WishList() {


  const [isLoading, setisLoading] = useState(false)
  const [wishlistDetails, setwishlistDetails] = useState([])
  const [currentId2, setcurrentId2] = useState(0)

  const [addToCartLoading, setAddToCartLoading] = useState(null); 
const [removeLoading, setRemoveLoading] = useState(null); 
const [wishArray, setwishArray] = useState(localStorage.getItem("Array", []))

const [isRed, setisRed] = useState([])



let{ getUserWishList , deleteWishListI }= useContext(WishListContext)

let {addProductToCart}= useContext(CartContext)






async function deleteWishList(productId) {
      setRemoveLoading(productId)

  try {

    let response = await deleteWishListI(productId);
    console.log(response)

    if (response.data.status === "success") {

      const updatedArray = response.data.data;
      console.log(updatedArray)
      localStorage.setItem("Array", JSON.stringify(updatedArray));
      setwishArray(updatedArray);
    
      setisRed((prev = {}) => {
        const updated = { ...prev };
        delete updated[productId]; 
        localStorage.setItem("isRed", JSON.stringify(updated)); 
        return updated; 
      });

      setwishlistDetails((prevDetails) =>
        prevDetails.filter((item) => item._id !== productId)
      );
      
      console.log(wishlistDetails)
      
      setRemoveLoading(null); 
      
 
    } 
    else {
      toast.error(response.data.message);
      setRemoveLoading(null); 

    }
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    toast.error("Failed to delete item. Please try again!");
  }
}



async function getWishListItems(){
  setisLoading(true)

  let response =await getUserWishList();

  if(response.data.status == "success"){
 setisLoading(false)

 setwishlistDetails(response.data.data)

 
   console.log(response.data.data)
  }
  else{
   setisLoading(false)
 
 
  }
 
}


async function addToCart(id){
  setAddToCartLoading(id)
  let response = await addProductToCart(id);
  if ( response.data.status =="success"){
  setAddToCartLoading(null) 
 setcurrentId2(id)  

toast.success(response.data.message);

try {
    
  let response1 = await deleteWishListI(id);
    console.log(response1)
  if (response1.data.status == "success") {
    setcurrentId2(null); 
    setwishlistDetails((prevDetails) =>
      prevDetails.filter((item) => item._id !== id)
    );
  } 

  else {
     setcurrentId2(null); 
     toast.error(response1.data.message);
    
  }
}
 catch (error) {

  console.error("Error deleting wishlist item:", error);
  toast.error("Failed to delete item. Please try again!");
}



}

else{
    setAddToCartLoading(null)

  toast.error(response.data.message);

}

}



useEffect(() => {
  const savedIsRed = JSON.parse(localStorage.getItem("isRed")) || {};
  setisRed(savedIsRed);
}, []);

useEffect(()=>{getWishListItems() }, [])

  return<>
  
{isLoading? <> <div className='min-h-screen justify-center content-center row m-auto w-1/2 '>  <div className="spinner"> </div></div> 
  </> :
   <> 
  {wishlistDetails?.length > 0 ? 
  <div className='w-full min-h-screen mt-16'>

<h1 className='font-bold text-4xl text-green-500 items-center pb-6'>My Wishlist <i className="fa-solid fa-heart" style={{color: 'red'}}></i> </h1>

{wishlistDetails?.map((wish)=> 
<>
  <div key={wish._id} className='lg:w-[80%] m-auto w-[85%] bg-emerald-50 mb-5 rounded-lg  hover:shadow-lg hover:shadow-green-100 border-2 border-green-300 '>

<div  className='row w-full rounded-lg items-center justify-center lg:justify-between m-auto gap-2 p-6 ' >

<Link to={`/productdetails/${wish._id}/${wish.category.name}`}> 
<div className='mx-2 p-3 lg:mx-10'> 
    <img src={wish?.imageCover} alt="freshcart" className=' m-auto lg:w-[200px] lg:h-[260px] object-cover ' />
  </div>


</Link> 
<div className='flex flex-col px-2 p-1 lg:text-left capitalize lg:mx-10 lg:w-5/12 w-[85%]'>
  <h2 className='text-2xl font-semibold'>{wish?.title}</h2>
  <h3 className='text-xl font-semibold p-2 text-green-400'>{wish?.price} EGP</h3>
  <span className='px-2 text-lg'> {wish?.ratingsAverage}<i className='fas fa-star text-yellow-400 px-1'></i></span>



</div>


    
  <div className="row flex flex-col gap-2 items-center  lg:mt-10">
  <button onClick={()=>{addToCart(wish._id)}} className='text-white bg-green-600 rounded-lg py-2  px-2 w-full '>
    {addToCartLoading == wish._id ?<i className="fas fa-spinner fa-spin"></i>: <div><i className="fa-solid fa-cart-plus" style={{color: '#fcfcfc'}}></i> Add To Cart</div>}
    </button>

    <button onClick={()=>{deleteWishList(wish._id)}} className='text-white bg-green-600 hover:text-white hover:bg-red-600 p-1 pe-2 rounded-lg w-full'> 
      {removeLoading == wish._id ?<i className="fas fa-spinner fa-spin"></i> :<div><i className="fa-solid fa-trash-can p-2" style={{color: 'white'}} />Remove</div>}
      </button>
    </div>

</div>
</div>
</>
)}


</div>: <div className="row mt-16"><h3 className=' bg-gray-50 w-[80%] mt-16 rounded-lg m-auto font-semibold text-3xl p-40 text-gray-600'> Your Wishlist Is Empty <i className="fa-solid fa-hourglass fa-lg mt-6" style={{color: '#59ee8d'}} /></h3></div>} </>
}
  </>
}
