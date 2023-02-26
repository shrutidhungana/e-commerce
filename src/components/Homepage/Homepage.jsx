import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "./ProductList/ProductList";
import Banner from "../Banner";
const queryClient = new QueryClient();

const Homepage = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Banner />
        <ProductList />
      </QueryClientProvider>
    </div>
  );
};

export default Homepage;
