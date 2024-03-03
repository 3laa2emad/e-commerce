import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import { AuthContextProvider } from './Context/AuthContext'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Brands from './components/Brands/Brands'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
const myRouter = createBrowserRouter([
  {path: '/' , element: <Layout /> , children:[
    {index: true , element: <Register />},
    {path: 'register' , element: <Register />},
    {path: 'login' , element: <Login />},
    {path: 'cart' , element:<ProtectedRoute>
      <Cart />
      </ProtectedRoute> },
    {path: 'brands' , element: <Brands />},
    {path: 'categories' , element: <ProtectedRoute>
      <Categories />
      </ProtectedRoute> },
    {path: 'productDetails/:id' , element: <ProtectedRoute>
      <ProductDetails />
      </ProtectedRoute> },
    {path: 'products' , element: <ProtectedRoute>
      <Products />
      </ProtectedRoute> },
    {path: '*' , element: <NotFound />},

  ]}
])






export default function App() {

const myClient = new QueryClient();

  return <>
  
<QueryClientProvider client={myClient}>

<AuthContextProvider>

<CartContextProvider>


<RouterProvider  router={myRouter} />


</CartContextProvider>

</AuthContextProvider>

</QueryClientProvider>

  

<Toaster/>
  
  
  
  
  
  </>
}
