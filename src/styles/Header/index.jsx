
import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Colors } from '../theme';

export const Navbar = styled(AppBar)({
  backgroundColor: Colors.primary,
  boxShadow: 'none',
   position: 'static',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: "space-between",
      alignItems: "center",
});

export const Logo = styled('img')({
  objectFit: 'contain',
  width: '20px'
  
});

export const NavLink = styled(Link)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: Colors.white,
  marginLeft: '2rem',
  textDecoration: 'none',
  '&:hover': {
    color: Colors.secondaryHover,
  },
});

export const CartIcon = styled(ShoppingCartIcon)({
  color: Colors.white,
});
