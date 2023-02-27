import { styled } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';
import { Colors } from '../theme';
import CircularProgress from '@mui/material/CircularProgress';




export const ProductCard = styled(Grid)(() => ({
  marginTop: '10px',
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
  // maxWidth: '80%',
  width: '50%',
  height: '50%',
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
  fontFamily: '"Open Sans", "Sans Serif"',
  backgroundColor: Colors.primary,
  '&:hover': {
    backgroundColor: Colors.primaryHover,
    
  }
    
}));

export const ViewDetailsButton = styled(Button)(() => ({
  marginTop: '2px',
  fontFamily: '"Open Sans", "Sans Serif"',
  borderRadius: '6px',
  backgroundColor: Colors.secondary,
  '&:hover': {
    backgroundColor: Colors.secondaryHover,
    
  }
}));

export const ViewAllButton = styled(Button)(( ) => ({
  marginTop: '35px',
  alignSelf: 'center',
  fontFamily: '"Open Sans", "Sans Serif"',
  borderRadius: '4px',
  backgroundColor: Colors.primary,
  '&:hover': {
    backgroundColor: Colors.primaryHover,
    
  }
    
  
  
}));

export const ViewAllDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledProgress = styled(CircularProgress)(() => ({
  color: Colors.secondary,
  width: '10rem',
  height: '10rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
}))

