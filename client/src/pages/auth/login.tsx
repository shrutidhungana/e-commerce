import React from 'react';
import AuthLayout from '@/components/auth/layout';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    
    return (
      <AuthLayout>
            <div className="flex flex-col overflow-hidden bg-white">
               Login 
        </div>
      </AuthLayout>
    );
}
export default Login;