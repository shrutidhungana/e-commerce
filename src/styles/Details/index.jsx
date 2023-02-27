import { Box } from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import { Colors } from '../theme';

export const StyledProductDetails = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
  });
  
  export const StyledProductImage = styled('img')({
    maxWidth: '100%',
    height: 'auto',
  });


 
  
