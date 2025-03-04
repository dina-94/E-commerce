import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import UserContextprovider from './context/UserContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Recentproducts from './components/Recentproducts/Recentproducts';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import ForgotPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetNewPassword from './components/ResetNewPassword/ResetNewPassword';
import WishList from './components/WishList/WishList';
import WishListtContextProvider from './context/WishListContext';










let x = createHashRouter([
  {path: "e-commerce" , element : <Layout /> ,
     children: [
    {index : true , element: <ProtectedRoute><Home /> </ProtectedRoute> },
    {path: "productdetails/:id/:category" , element: <ProtectedRoute><ProductDetails /></ProtectedRoute>  },
    {path: "recentproducts" , element: <ProtectedRoute><Recentproducts /></ProtectedRoute>  },
    {path: "brands" , element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path: "cart" , element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path: "categories" , element:<ProtectedRoute><Categories /></ProtectedRoute> },
    {path: "checkout" , element:<ProtectedRoute><CheckOut /></ProtectedRoute> },
    {path: "allorders" , element:<ProtectedRoute><AllOrders /></ProtectedRoute> },
    {path: "wishlist" , element:<ProtectedRoute><WishList /></ProtectedRoute> },
    {path: "forgotpassword" , element:<ForgotPassword /> },
    {path: "resetpassword" , element:<ResetPassword /> },
    {path: "resetnewpassword" , element:<ResetNewPassword /> },
    {path: "register" , element: <Register />},
    {path: "login" , element: <Login />},
    {path: "*" , element: <Notfound />},


  ]}
])

export default function App() {




  return (
  <>


<UserContextprovider>

<CartContextProvider>
<WishListtContextProvider>
<RouterProvider router={x} />
<Toaster/>
</WishListtContextProvider>
</CartContextProvider>


</UserContextprovider>

    
  </>
  )
}


