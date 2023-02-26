import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/Common/Header';

import Banner from '../components/Banner';
import Homepage from '../components/Homepage/Homepage';

const AppRouter = () => {
  return (
      <div>
      <Router>
              <Header />
              <Routes>
                 
                  <Route  exact path = "/" element = {<Homepage/>}/>
              </Routes>       
              
  </Router>  
         
      </div>
  )
}

export default AppRouter