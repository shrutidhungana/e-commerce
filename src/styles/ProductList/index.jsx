import { styled } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';
import { Colors } from '../theme';





export const ProductCard = styled(Grid)(({ theme }) => ({
  marginTop: 6,
  borderRadius:'12px',
  border: '3px solid',
  borderColor: Colors.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
   height: '100%',
    
}));
  
export const ProductImage = styled('img')({
  maxWidth: '70%',
  height: 'auto',
  objectFit: 'cover',
  overflow: 'hidden',
});

export const ProductName = styled('h3')({
  textAlign: 'center',
  color: Colors.primary,
  fontFamily:'"Open Sans", "Sans Serif"'
});

export const ProductPrice = styled('h4')({
  textAlign: 'center',
  color: Colors.secondary,
  fontSize: '17px',
  fontFamily:'"Open Sans", "Sans Serif"'
});

export const AddToCartButton = styled(Button)(() => ({
  marginTop: '3px',
  fontFamily:'"Open Sans", "Sans Serif"'
}));

export const ViewDetailsButton = styled(Button)(() => ({
  marginTop: '2px',
  fontFamily: '"Open Sans", "Sans Serif"',
  borderRadius: '6px,'
}));

export const ViewAllButton = styled(Button)(( ) => ({
  marginTop: '15px',
  alignSelf: 'center',
  fontFamily: '"Open Sans", "Sans Serif"',
  borderRadius: '4px',
  
}));