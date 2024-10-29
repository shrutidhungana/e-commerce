import React from "react";
import AdminLayout from "@/components/admin-view/layout";

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
