import React, {useContext} from 'react';
import {  Logo, NavLink, CartIcon } from '../../../styles/Header';
import Logo1 from '../../../assets/Logo.png';
import { CartContext } from '../../../context/Cart';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';


const HeaderLinks = () => {
    const { cartItems } = useContext(CartContext);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    return (
        <div>
            
            <Logo src={Logo1} alt="Logo" component={Link} to="/" />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/cart">
            <Badge badgeContent={cartItemCount}
                >
                    <CartIcon />
                </Badge>   
                </NavLink>
              
        </div>
    )
};

export default HeaderLinks;