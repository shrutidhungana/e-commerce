import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../ProductList/ProductList";

const MoreProducts = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ProductList startPoint={12} numItems={20} />
      </QueryClientProvider>
    </div>
  );
};

export default MoreProducts;
