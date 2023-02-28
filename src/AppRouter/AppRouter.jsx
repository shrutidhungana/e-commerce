import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from '../components/Common/Header/Header';
import Banner from '../components/Banner';
 import Homepage from '../components/Homepage/Homepage';
import Products from '../components/Products/Products';
import MoreProducts from '../components/MoreProducts/MoreProducts';
import Details from '../components/Details/Details';
import LoginPage from '../components/Login/Login';
import AdminPage from '../components/Admin/Admin';
import Cart from '../components/Cart/Cart';

const AppRouter = () => {
  return (
      <div>
      <Router>
              <Header />
              <Routes>
                 
                  <Route exact path="/" element={<Homepage />} />
                  <Route exact path="/products" element={<Products />} />
                  <Route  exact path="/remainproducts" element={<MoreProducts />} />
                  <Route exact path="/products/:id" element={<Details />} />
                  
                  <Route exact path="/login" element={<LoginPage />} />
                    
                  <Route exact path="/admin" element={<AdminPage />} />
                  <Route exact path="/cart" element={<Cart />} />

              </Routes>  
              
              
  </Router>  
         
      </div>
  )
}

export default AppRouter