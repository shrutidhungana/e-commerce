import React, { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AdminDashboard from "./AdminDashboard/AdminDashboard";


import { ToastContainer } from "react-toastify";
const AdminPage = () => {
  
  const queryClient = new QueryClient();
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
              <AdminDashboard />
            <ToastContainer position = 'bottom-right'/>
      </QueryClientProvider>
         
  
    </>
  );
};
export default AdminPage;
