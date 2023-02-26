import { styled } from '@mui/material/styles';

import { autocompleteClasses, Box, Typography } from '@mui/material';
import { Colors } from '../theme';
import { grid } from '@mui/system';

export const StyledBanner = styled(Box)(({ theme }) => ({
    marginTop: 4,
    backgroundColor: Colors.primary,
    width: '99vw',
    marginLeft: '-156px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
}));

export const BannerContent = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 420,
    padding: "30px",
  }));
  
  export const BannerTitle = styled(Typography)(({  theme }) => ({
    lineHeight: 1.5,
    fontSize: "72px",
      marginBottom: "20px",
    color: Colors.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '42px', 
      color: Colors.secondary,  
    }
  }));

  export const BannerDescription = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      lineHeight: 1.15,
      letterSpacing: 1.15,
      marginBottom: "1.5em",
    },
  }));
  
export const BannerImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    marginTop: 4,
    
    width: "500px",
    height: 'auto',
    [theme.breakpoints.down("md")]: {
        width: "350px",
    },
    [theme.breakpoints.down("sm")]: {
        width: "320px",
        height: "300px",
    },
}));