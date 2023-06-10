import React, {useContext} from 'react'
import { Navbar, Logo, NavLinks, NavLinkItem, CartIcon, LogoutButton} from '../../../styles/Header'
import {  useNavigate } from 'react-router-dom';
import Logo1 from '../../../assets/logo.png'
import { CartContext } from '../../../contexts/Cart/CartContext';
import { AuthContext } from '../../../contexts/Authentication/AuthContext';
import { Badge, CssBaseline } from '@mui/material';

const Header = () => {
  const { cartItems } = useContext(CartContext);
    
  const { authToken, removeToken, isAdmin } = useContext(AuthContext);
  const cartItemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
  );

  

  const navigate = useNavigate()
  const handleLogout = () => {
      removeToken();
      navigate("/login");
  };
  return (
    
    <>
    <CssBaseline />
      <Navbar>
      <NavLinks>
      <NavLinkItem to="/">
        <Logo>
          <img src = {Logo1} alt = "logo" width = "150px"/>
        </Logo>
          </NavLinkItem>
          </NavLinks>
          <NavLinks>
      <NavLinkItem to="/">
      Home
    </NavLinkItem>
    <NavLinkItem to="/products">
      Products
        </NavLinkItem>
          <NavLinkItem to="/cart">
            
              <Badge badgeContent={cartItemCount} color="secondary">
                <CartIcon />
              </Badge>
  
          
        </NavLinkItem>
          {authToken ? (
          <>
              <NavLinkItem to = "/admin">Admin</NavLinkItem>
              <LogoutButton onClick={handleLogout} varient="contained">Logout</LogoutButton>
              </>
          
        ) : (
          <NavLinkItem to="/login">Login</NavLinkItem>
        )}
          </NavLinks>
         
      </Navbar>
    
      </>
  )
}

export default Header