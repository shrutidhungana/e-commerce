import React, {useContext} from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import AdminDashboard from './AdminDashboard/AdminDashboard';
import { AuthContext } from '../../context/Authentication/AuthContext';

import { useNavigate } from 'react-router-dom';
import { LogoutDiv, LogoutButton } from '../../styles/AdminDashboard';
const AdminPage = () => {
    const { removeToken,authToken } = useContext(AuthContext);
    const queryClient = new QueryClient();
    const navigate = useNavigate();
    const handleLogout = () => {
        removeToken();
        navigate("/login");
        };
        
        if (!authToken) {
        navigate("/login");
        return null;
        }
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AdminDashboard />
            </QueryClientProvider>
             <LogoutDiv>
            <LogoutButton variant="contained" onClick={handleLogout}>
             Logout
                </LogoutButton>
                </LogoutDiv>
        </>
    );
}


export default AdminPage;