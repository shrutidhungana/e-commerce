import React from 'react';
import AdminLayout from '@/components/admin-view/layout'

type productsProps = {
    
};

const AdminProducts:React.FC<productsProps> = () => {
    
    return (
        <AdminLayout>
            <div>
                Products
            </div>
       </AdminLayout>
    );
}
export default AdminProducts;