import { Grid,Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from '../theme';
import CircularProgress from '@mui/material/CircularProgress';



export const ProductImage = styled('img')({
  // maxWidth: '80%',
  height: 0,
  paddingTop: '56.25%',
  
});

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
   width: '50%',
    
}));
  
export const ProductName = styled('h3')({
  textAlign: 'center',
  color: Colors.primary,
  fontFamily: '"Open Sans", "Sans Serif"',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    whiteSpace: 'normal',
    maxWidth: 'unset',
    overflow: 'visible',
    textOverflow: 'unset',
    color: Colors.primaryHover,
    cursor: 'pointer',
  },

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

export const ProductDescription = styled('p')({
  color: Colors.primary,
  overflow: 'auto',
  fontSize: '16px',
  textAlign: 'center',
  fontWeight: 500,
  fontFamily: '"Open Sans" "sans serif"',
});

export const ProductCategory = styled('p')({
  color: Colors.secondary,
  overflow: 'auto',
  fontSize: '20px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: '"Open Sans" "sans serif"',
});


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

export const ViewAllDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledProgress = styled(CircularProgress)(() => ({
  color: Colors.secondary,
  width: '10rem',
  height: '10rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
}));

export const ProductDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10px'
});