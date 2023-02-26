import { useState } from "react";
import {  useQuery } from 'react-query';
import { AddShoppingCart, Visibility } from '@mui/icons-material';



const apiUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.slice(0, 4);
};

const ProductList = () => {
  const { data, isLoading, error } = useQuery('products', fetchProducts);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.map((product) => (
          <Grid item xs={12} md={3} key={product.id}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.title} />
              <ProductName>{product.title}</ProductName>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              <AddToCartButton
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
                onClick={() => addToCart(product)}
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
      <ViewAllButton variant="contained" onClick={() => console.log('View all')}>
        View all
      </ViewAllButton>
    </>
  );
}
export default ProductList;