import React, { createContext, useReducer, useState } from "react";
import CartReducer from "../../Reducers/Cart/CartReducer";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../Reducers/Cart/ReducerTypes";

import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext(null);

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  
  
  const addToCart = (currentProductItem) => {
    dispatch({ type: ADD_TO_CART, currentProductItem: currentProductItem });
    
  };

  const removeFromCart = (currentIdToBeDeleted, typeOfDelete) => {
    dispatch({ type: REMOVE_FROM_CART, currentIdToBeDeleted, typeOfDelete });
  };

 

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        
      
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
