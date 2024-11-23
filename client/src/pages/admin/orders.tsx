import React from 'react';
import AdminLayout from '@/components/admin-view/layout'
import AdminOrdersView from "@/components/admin-view/orders";


type OrdersProps = {
    
};

const AdminOrders:React.FC<OrdersProps> = () => {
    
    return (
      <AdminLayout>
        <div>
          <AdminOrdersView />
        </div>
      </AdminLayout>
    );
}
export default AdminOrders;