import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Common/Header/Header";
import Homepage from "../components/Homepage/Homepage";
import Products from "../components/Products/Products";
import MoreProducts from "../components/MoreProducts/MoreProducts";
import Details from "../components/Details/Details";
import LoginPage from "../components/Login/Login";
import AdminPage from "../components/Admin/Admin";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Common/Footer/Footer";
import { Box } from "@mui/material";

const routes = [
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/remainproducts',
    element: <MoreProducts />
  },
  {
    path: '/products/:id',
    element: <Details />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/cart',
    element: <Cart />
  }
];

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Box sx={{ minHeight:'calc(100vh - 64px - 20px)',flexGrow: 1}}>
          <Header />
        
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          </Routes>
          </Box>
       <Footer />
      </Router>
    </div>
  );
};

export default AppRouter;