import React, { useContext, useState } from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { useEffect } from 'react'




export default function Navbar() {

let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setisScrolled] = useState(false)

  let {userLogin , setuserLogin} = useContext(UserContext)
  let{getUserCart , carNum} = useContext(CartContext)

function Signout(){
  localStorage.removeItem("userToken");
  setuserLogin(null);
  navigate("login")
}


function handleScroll(){
  if (window.scrollY > 45) {
    setisScrolled(true);
  } else {
    setisScrolled(false);
  }

}

  window.addEventListener("scroll", handleScroll);


async function uCart(){
  let res = await getUserCart()
  if(res.data?.status == "success"){
  console.log(res.data.numOfCartItems)
  return carNum;
  }
  else{
    console.log(res)

  }
}


useEffect(()=> {uCart(),
  window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
},[])

  return (
  <>
<nav className= {` fixed text-center top-0 left-0 right-0 shadow-md z-10 transition-all duration-300 ${isScrolled? "bg-green-200":"bg-gradient-to-r from-blue-500/60 to-green-500/60"}`}>


    <div className="row flex lg:flex-row gap-3  justify-between items-center mx-auto max-w-screen-xl p-4">


<div className='flex-col lg:flex-row items-center gap-4'>

<Link to ="" className="flex items-center space-x-3 rtl:space-x-reverse"><img src={logo} width={"130px"} className="h-8" alt="Flowbite Logo" />
           
        </Link>

</div>





      


 <div className="flex justify-between items-center ">
  

    {userLogin != null ?  
     <><button className="lg:hidden  " onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
            <ul className={`${isOpen ? "block" : "hidden"} lg:flex flex-col lg:flex-row  gap-4 bg-green-100 lg:bg-transparent  absolute lg:static  w-full m-auto top-full right-0`}>
                
            <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="">Home</Link></li>
  <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/recentproducts">Products</Link></li>
  <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/categories">Categories</Link></li>
  <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/brands">Brands</Link></li>
  <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/allorders">All Orders</Link></li>
  <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/wishlist">Wish List</Link></li>
               <li><Link className='text-slate-800 hover:text-green-700 text-lg' onClick={() => setIsOpen(false)} to="/cart"> Cart <i className="fa-solid fa-cart-plus" style={{color: '#22c55e'}}></i>{carNum>0&&carNum}</Link></li>
 </ul></>:null}
     
      </div>


  <div className="lg:flex items-center space-x-6 lg:rtl:space-x-reverse  ">
            

    


<div className='flex gap-4'>

{userLogin != null? <span onClick={Signout} className='cursor-pointer hover:text-green-700'>Sign out</span> :
<>
<Link to ="login" className='cursor-pointer hover:text-green-700 text-lg'>Login</Link>
  <Link to ="register" className='cursor-pointer hover:text-green-700 text-lg'>Sign Up</Link> 
</>
}
 
</div>

        </div>
    </div>



   


</nav>

  </>
  )
}
