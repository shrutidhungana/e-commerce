import { styled } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';


 export const ProductCard = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100%',
}));
  
export const ProductImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

export const ProductName = styled('h3')({
  textAlign: 'center',
});

export const ProductPrice = styled('h4')({
  textAlign: 'center',
});

export const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ViewDetailsButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignSelf: 'center',
}));