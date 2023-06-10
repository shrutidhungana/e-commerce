import React from "react";
import AppRouter from "./AppRouter/AppRouter";
import { ThemeProvider } from "@mui/system";
import { Container, Stack } from "@mui/material";
import theme from "./styles/theme";
import CartProvider from "./contexts/Cart/CartContext";
import AuthProvider from "./contexts/Authentication/AuthContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
        }}
      >
        <Stack>
          <AuthProvider>
            <CartProvider>
              <AppRouter />
            </CartProvider>
          </AuthProvider>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default App;
