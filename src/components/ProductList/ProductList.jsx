import { useState } from "react";
import {  useQuery } from 'react-query';
import { AddShoppingCart, Visibility } from '@mui/icons-material';
import { ProductCard, ProductImage, ProductName, ProductPrice, AddToCartButton, ViewDetailsButton, StyledProgress } from '../../styles/ProductList'
import { Grid } from "@mui/material";



const apiUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
    return data;
};

const ProductList = ({startPoint,numItems}) => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);

  

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
              <ProductName>{product.title}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              <AddToCartButton
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                
              >
                Add to cart
              </AddToCartButton>
              <ViewDetailsButton
                variant="contained"
                color="secondary"
                startIcon={<Visibility />}
              >
                View details
              </ViewDetailsButton>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
     
    </>
  );
}
export default ProductList;
