import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../ProductList/ProductList";
import Banner from "../Banner/Banner";

import { ViewAllDiv, ViewAllButton } from "../../styles/ProductList";

const Homepage = () => {
  const queryClient = new QueryClient();
  return (
    <div>
       <Banner />
      <div>
      <QueryClientProvider client={queryClient}>
      
        <ProductList startPoint={0} numItems={4} />
        <ViewAllDiv>
          <ViewAllButton variant="contained" href="/products">
            View all
          </ViewAllButton>
        </ViewAllDiv>
        </QueryClientProvider>
        </div>
    </div>
  );
};

export default Homepage;
