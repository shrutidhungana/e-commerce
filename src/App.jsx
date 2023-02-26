import React from 'react'
import { UIProvider } from './context/UI'
import AppRouter from './AppRouter/AppRouter'
import { ThemeProvider } from '@mui/system';
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import theme from './styles/theme'
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
        <AppRouter />
      </UIProvider>
        </Stack>
     </Container>
</ThemeProvider>
    
    </div>
  )
}

export default App

