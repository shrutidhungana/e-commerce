
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

 const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem("authToken") || "");

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    setAuthToken("");
    sessionStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;