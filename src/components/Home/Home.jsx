import React from 'react'
import style from "./Home.module.css"
import RecentBroduct from '../Recentproducts/Recentproducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'



export default function Home() {
  return(
  <>
  
  <MainSlider/>
  <CategoriesSlider/>
  <RecentBroduct/>
  </>
  )
}
