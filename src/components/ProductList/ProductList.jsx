import React,{ useContext, useState } from "react";
import { useQuery } from "react-query";
import { AddShoppingCart, Visibility } from "@mui/icons-material";
import {
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  AddToCartButton,
  ViewDetailsButton,
  StyledProgress,
  StyledLink,
  
} from "../../styles/ProductList";
import { Grid } from "@mui/material";
import { CartContext } from "../../contexts/Cart/CartContext";
import { apiUrl } from "../../API/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductList = ({ startPoint, numItems }) => {
 
  const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data;
  };
  const { data, isLoading } = useQuery("products", fetchProducts);
  const { addToCart } = useContext(CartContext);
  const [isCartButtonDisabled, setIsCartButtonDisabled] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartButtonDisabled(true);
    toast.success("Item added to cart", {
      autoClose: 5000,
      onClose: () => setIsCartButtonDisabled(false),
    });
    
  };

  return (
    <>
      
      <Grid container spacing={2}>
        {data?.slice(startPoint, numItems)?.map((product) => (
          <Grid item xs={12} md={3} key={product.id}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.title} />
              <ProductName>
                
                  Name: {product.title}
                  
              </ProductName>
              <ProductPrice>Price: ${product.price.toFixed(2)}</ProductPrice>
              <AddToCartButton
                variant="contained"
                startIcon={<AddShoppingCart />}
                onClick={() => handleAddToCart(product)}
                disabled={isCartButtonDisabled}
                
              >
                Add to Cart
              </AddToCartButton>
              <ToastContainer position="bottom-right"/>
              <StyledLink to={`/products/${product.id}`}>
                <ViewDetailsButton
                  variant="contained"
                  startIcon={<Visibility />}
                >
                  View details
                </ViewDetailsButton>
              </StyledLink>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
      {isLoading&&<StyledProgress/>}
    </>
  );
};
export default ProductList; 









 
