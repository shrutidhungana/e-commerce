import React from 'react';
import AuthLayout from '@/components/auth/layout';

type loginProps = {
    
};

const login:React.FC<loginProps> = () => {
    
    return (
      <AuthLayout>
            <div className="flex flex-col overflow-hidden bg-white">
               Login 
        </div>
      </AuthLayout>
    );
}
export default login;