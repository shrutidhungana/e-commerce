import React from 'react';
import ShoppingLayout from '@/components/shopping-view/layout'

type homeProps = {
    
};

const ShoppingHome:React.FC<homeProps> = () => {
    
    return (
        <ShoppingLayout>
            <div>
                Home
            </div>
       </ShoppingLayout>
    );
}
export default ShoppingHome;