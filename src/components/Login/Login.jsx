import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authentication/AuthContext";
import { LoginContainer, LoginForm, LoginButton, LoginWrapper, Title,Input, Icon } from '../../styles/Login';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext(AuthContext);
    const navigate= useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        navigate("/admin");
      } else {
        alert("Invalid username or password");
      }
    };
  
    return (
        <>
        <LoginWrapper>
        <LoginContainer>
             <Icon />       
        <Title>Login</Title>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            placeholder="User Name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <LoginButton variant="contained" type="submit">
            Login
          </LoginButton>
        </LoginForm>
            </LoginContainer>
            </LoginWrapper>
            </>
    );
  };
  
  export default LoginPage;