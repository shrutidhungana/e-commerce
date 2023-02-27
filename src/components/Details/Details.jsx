import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from './ProductDetails/ProductDetails';
const Details = () => {
    return (
        <QueryClientProvider client={new QueryClient()}>
          <ProductDetails />
        </QueryClientProvider>
      );
}

export default Details;