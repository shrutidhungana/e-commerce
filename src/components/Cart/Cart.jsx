import React, { useContext, useEffect } from "react";
import { Box, Table, TableBody, Paper, Button } from "@mui/material";
import {
  StyledTableContainer,
  Empty,
  StyledTableCell,
  StyledTableCells,
  StyledTableHead,
  StyledTableRow,
  QuantityWrapper,
  QuantityWrapperNumber,
} from "../../styles/Cart";
import { CartContext } from "../../context/Cart";
const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  console.log(cartItems);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
      {!cartItems.length && <Empty>There are no items in Cart</Empty>}
      <Box sx={{ p: 2 }}>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableBody>
              {cartItems.map((items) => (
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
                    <Button
                      onClick={() => removeFromCart(items.id, "partial")}
                      disabled={items.quantity === 1}
                    >
                      -
                    </Button>
                    <QuantityWrapperNumber>
                      {items.quantity}
                    </QuantityWrapperNumber>
                    <Button onClick={() => addToCart(items)}>+</Button>
                  </QuantityWrapper>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    </>
  );
};

export default Cart;
