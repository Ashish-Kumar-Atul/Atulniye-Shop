import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import MainLayout from './layout/MainLayout.jsx'
import Home from './pages/home.jsx'
import { CartProvider } from './context/CartContext.jsx'
import MyCart from './pages/mycart.jsx'
import AddItems from './pages/AddItems.jsx'
import Shop from './pages/Shop.jsx'
import MyOrders from './pages/MyOrders.jsx'
import MyProducts from './pages/MyProducts.jsx'
import MyStats from './pages/MyStats.jsx'

import AuthLayout from './layout/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import GetStarted from './pages/GetStarted.jsx'

import ErrorPage from './pages/Error.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='my-cart' element={<MyCart />} />
        <Route path='/add-item' element={<AddItems />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/my-products' element={<MyProducts />} />
        <Route path='/my-stats' element={<MyStats />} />
      </Route>
      
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />}/>
        <Route path='/get-started' element={<GetStarted />}/>
      </Route>

      <Route path='*' element={<ErrorPage/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
)