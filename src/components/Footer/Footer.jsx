import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'


export default function Footer() {



  return<>
<div className='flex lg:flex-row flex-col items-center lg:gap-16 justify-center bg-green-100 p-2 text-center left-0 right-0 shadow-green-500 drop-shadow-md'>

<ul className='py-1 flex items-center justify-center gap-4'>
          <li> <Link to="https://instagram.com"><i className='fab fa-instagram hover:text-green-500'></i></Link> </li>
          <li><Link to="https://facebook.com"><i className='fab fa-facebook hover:text-green-500'></i></Link> </li>
          <li><Link to="https://tiktok.com"><i className='fab fa-tiktok hover:text-green-500'></i></Link> </li>
          <li> <Link to="https://twitter.com"><i className='fab fa-twitter hover:text-green-500'></i></Link></li>
          <li><Link to="https://linkedin.com"><i className='fab fa-linkedin hover:text-green-500'></i></Link> </li>
          <li><Link to="https://youtube.com"><i className='fab fa-youtube hover:text-green-500'></i></Link> </li>
        </ul>
<div className="px-2 text-center text-sm">
        <p>© 2025 FreshCart. All rights reserved.</p>
      </div>
</div>
 
  </>
}
