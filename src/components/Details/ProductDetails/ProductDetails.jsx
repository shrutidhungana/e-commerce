import React ,{ useState,useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  Image,
  ProductName,
  ProductCard,
  ProductPrice,
  ProductDescription,
  ProductCategory,
  AddToCartButton,
  StyledProgress,
  ViewAllDiv,
  ViewAllButton,
  ProductDiv,
} from "../../../styles/Details";

import { CartContext } from "../../../contexts/Cart/CartContext";
import { AddShoppingCart } from "@mui/icons-material";
import { apiUrl } from "../../../API/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [isCartButtonDisabled, setIsCartButtonDisabled] = useState(false);

  const handleAddToCart = (data) => {
    addToCart(data);
    setIsCartButtonDisabled(true);
    toast.success("Item added to cart", {
      autoClose: 5000,
      onClose: () => setIsCartButtonDisabled(false),
    });
  };

  const { data, isLoading, isError } = useQuery(["product", id], () =>
    fetch(`${apiUrl}/${id}`).then((res) => res.json())
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
          <Image src={image} alt={title} />
          <ProductName>Name: {title}</ProductName>
          <ProductPrice>Price: ${price}</ProductPrice>
          <ProductCategory>Category: {category}</ProductCategory>
          <ProductDescription>About: {description}.</ProductDescription>
          <AddToCartButton
            variant="contained"
            
            startIcon={<AddShoppingCart />}
            onClick={() => handleAddToCart(data)}
            disabled={isCartButtonDisabled}
          >
            Add to Cart
          </AddToCartButton>
          <ToastContainer position="bottom-right"/>
        </ProductCard>
      </ProductDiv>
      <ViewAllDiv>
        <ViewAllButton variant="contained" href="/products">
          View all
        </ViewAllButton>
      </ViewAllDiv>
    </>
  );
};

export default ProductDetails;
