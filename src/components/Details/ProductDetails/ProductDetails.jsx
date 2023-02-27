import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { ProductImage, ProductName, ProductCard, ProductPrice, ProductDescription, ProductCategory, AddToCartButton,StyledProgress,ViewAllDiv,ViewAllButton, ProductDiv } from "../../../styles/Details";
import { useContext } from "react";
import { CartContext } from "../../../context/Cart";
import { AddShoppingCart } from '@mui/icons-material';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
  
    const { data, isLoading, isError } = useQuery(['product', id], () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
    );
  
    if (isLoading) {
      return <StyledProgress />;
    }
  
    if (isError) {
      return <div>Error fetching product details</div>;
    }
  
    const { title, description, price, category, image } = data;
  return (
    <>
         <ProductDiv>
        <ProductCard>
            <ProductImage image={image} alt={title} />
            <ProductName>{title}</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <ProductCategory>{category}</ProductCategory>
        <ProductDescription>{description}.</ProductDescription>
        <AddToCartButton
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCart />}
        onClick={() => {
          addToCart(product);
        }}
      >
      Add to Cart
      </AddToCartButton>
        </ProductCard>
        </ProductDiv>
      <ViewAllDiv>
      <ViewAllButton variant="contained"
          href = "/products"
      >
  View all
</ViewAllButton>
      </ViewAllDiv>
      </>
    );  
};

export default ProductDetails;
