import React, { useContext, useEffect, useState } from "react";
import { Box, Table, TableBody } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  
  Empty,
  Total,
  StyledTableCells,
  CheckoutButton,
  StyledTableRow,
  QuantityWrapper,
  QuantityWrapperNumber,
  RemoveButton,
  QuantityButton,
  TotalDiv
  
} from "../../styles/Cart";
import { CartContext } from "../../contexts/Cart/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(cartItems.length === 0);
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, items) => total + items.price * items.quantity,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  const calculateDiscountPrice = () => {
    return cartItems.length >=2 ? totalPrice * 0.1 : 0;
  };

  const calculateGrandTotalPrice = () => {
    return cartItems.length >=2 ? totalPrice * 0.9 : totalPrice;
  };

  const handleCheckout = () => {
    setIsDisabled(true);
    toast.success("Checkout successful!");
    
    setIsCartEmpty(true);
    localStorage.clear();
    cartItems.forEach(items => removeFromCart(items.id, 'all'));
  };

  const handleRemoveFromCart = (id, total) => {
    removeFromCart(id, total);
    toast.success("Removed item from cart");
  };

  const handleRemoveSingleItem = (id, partial) => {
    removeFromCart(id, partial);
    toast.success("Decreased Single Quantity")
  };

  const handleAddSingleItem = (items) => {
    addToCart(items);
    toast.success("Increased Single Quantity")
  };



  return (
    <>
    <ToastContainer position="bottom-right" />
    <>
      {isDisabled? (
        <>
         
          <CheckoutButton>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Continue Shopping
            </Link>
          </CheckoutButton>
        </>
      ) : isCartEmpty ? (
        <>
          <Empty>Your cart is empty</Empty>
        </>
      ) : (
        <>
              <Box sx={{ p: 2 }}>
                
            <Table >
              <TableBody>
                {cartItems.map((items) => (
                  <>
                    <StyledTableRow key={items.id}>
                      <StyledTableCells>
                        <img
                          src={items.image}
                          alt={items.title}
                          width="50"
                          height="50"
                        />
                      </StyledTableCells>
                      <StyledTableCells>{items.title}</StyledTableCells>
                      <StyledTableCells>${items.price}</StyledTableCells>
                          <QuantityWrapper>
                        <QuantityButton
                          onClick={() => handleRemoveSingleItem(items.id, "partial")}
                          disabled={items.quantity === 1}
                        >
                          -
                        </QuantityButton>

                        <StyledTableCells>
                          <QuantityWrapperNumber>
                            {items.quantity}
                          </QuantityWrapperNumber>
                        </StyledTableCells>
                        <QuantityButton onClick={() => handleAddSingleItem(items)}>
                          +
                        </QuantityButton>
                        </QuantityWrapper>

                      <StyledTableCells>
                        ${(items.price * items.quantity).toFixed(2)}
                      </StyledTableCells>
                      <StyledTableCells>
                        <RemoveButton
                          onClick={() => handleRemoveFromCart(items.id, "total")}
                        >
                          Remove From Cart
                        </RemoveButton>
                       
                      </StyledTableCells>
                    </StyledTableRow>
                  </>
                ))}
                
              </TableBody>
                  </Table>
                  <TotalDiv>
                  <Total>Total Price: ${calculateTotalPrice().toFixed(2)}</Total>
                  <Total>Discount: ${calculateDiscountPrice().toFixed(2)}</Total>
                  <Total>
                    {" "}
                    Grand Total Price: ${calculateGrandTotalPrice().toFixed(2)}
                  </Total>
                  
                  <CheckoutButton onClick={handleCheckout}>
                    Checkout
                        </CheckoutButton>
                        </TotalDiv>  
          </Box>
        </>
      )}
    </>
    
    </>
  );
};

export default Cart;
