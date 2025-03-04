import React from 'react'
import style from "./Layout.module.css"
import Navbar from "./../Navbar/Navbar"
import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer'




export default function Layout() {
  return (
  <>
  <Navbar/>

<div  className='container text-center min-h-screen mx-auto w-full py-14 overflow-hidden '>
<Outlet/>

</div>
<Footer/>

  </>
  )
}
