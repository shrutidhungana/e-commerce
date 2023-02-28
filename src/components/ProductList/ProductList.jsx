import { useContext } from "react";
import {  useQuery } from 'react-query';
import { AddShoppingCart, Visibility } from '@mui/icons-material';
import { ProductCard, ProductImage, ProductName, ProductPrice, AddToCartButton, ViewDetailsButton, StyledProgress, StyledLink } from '../../styles/ProductList'
import { Grid } from "@mui/material";
import { CartContext } from "../../context/Cart";



const apiUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
    return data;
};

const ProductList = ({startPoint,numItems}) => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);
  const { addToCart } = useContext(CartContext);
  

  if (isLoading) {
    return <StyledProgress />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.slice(startPoint, numItems).map((product) => (
          <Grid item xs={12} md={3} key={product.id}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.title} />
              <ProductName>Name: {product.title}</ProductName>
              <ProductPrice>Price: ${product.price.toFixed(2)}</ProductPrice>
              <AddToCartButton
                variant="contained"
                // color="primary"
                startIcon={<AddShoppingCart />}
                onClick={() => {
                  addToCart(product);
                }}
              >
              Add to Cart
              </AddToCartButton>
              <StyledLink to = {`/products/${product.id}`}>
              <ViewDetailsButton
                variant="contained"
                color="secondary"
                startIcon={<Visibility />}
              >
                View details
                </ViewDetailsButton>
                </StyledLink>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
     
    </>
  );
}
export default ProductList;
