import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/Common/Header';

import Banner from '../components/Banner';
 import Homepage from '../components/Homepage/Homepage';
import Products from '../components/Products/Products';
import MoreProducts from '../components/MoreProducts/MoreProducts';
const AppRouter = () => {
  return (
      <div>
      <Router>
              <Header />
              <Routes>
                 
                  <Route exact path="/" element={<Homepage />} />
                  <Route path="/products" element={<Products />} />
                  <Route  path="/remainproducts" element={<MoreProducts />} />
                   
              </Routes>       
              
  </Router>  
         
      </div>
  )
}

export default AppRouter