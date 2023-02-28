import React from 'react'
import { UIProvider } from './context/UI'
import AppRouter from './AppRouter/AppRouter'
import { ThemeProvider } from '@mui/system';
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import theme from './styles/theme';
import CartState from './context/Cart';
import AuthProvider from './context/Authentication/AuthContext';
const App = () => {
  return (
    <div> 
    <ThemeProvider theme={theme}>
           
     <Container disableGutters
    maxWidth="xl"
    sx={{
      background: "#fff",
        }}
          >
        <Stack>
            <UIProvider>
              <AuthProvider>
              <CartState>
                <AppRouter />
                </CartState>
                </AuthProvider>
      </UIProvider>
        </Stack>
     </Container>
</ThemeProvider>
    
    </div>
  )
}

export default App

