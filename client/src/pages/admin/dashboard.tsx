import React, {useState,useEffect} from "react";
import AdminLayout from "@/components/admin-view/layout";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

type DashboardProps = {};

const AdminDashboard: React.FC<DashboardProps> = () => {
  return (
    <AdminLayout>
      <div>
        {/* Dashboard content goes here */}
       Dashboard
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
