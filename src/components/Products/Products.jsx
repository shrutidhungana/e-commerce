import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../ProductList/ProductList";
import { ViewAllDiv, ViewAllButton } from "../../styles/ProductList";

const Products = () => {
    const queryClient = new QueryClient();
    return (
        <div>
        <QueryClientProvider client={queryClient}>
        <ProductList startPoint={0 } numItems={12} />
        <ViewAllDiv>
            <ViewAllButton variant="contained"
                href = "/remainproducts"
            >
        View more
      </ViewAllButton>
        </ViewAllDiv>
            </QueryClientProvider>
            </div>
  );
}

export default Products