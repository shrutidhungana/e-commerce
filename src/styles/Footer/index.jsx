import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { Colors } from '../theme';

export const StyledFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:Colors.primary,
    color:Colors.white,
    padding: '20px 60px',
    position: 'sticky',
    MarginBottom: '-50%',
    // left: 0,
    right: 0,
    zIndex: 999,
    marginTop: '10px',
    left: '9%',
  transform: 'translateX(-9%)',
    width: '120.5%',
    '@media (max-width: 960px)': {
        flexDirection: 'column',
        padding: '20px',
        marginBottom: 0,
        left: 0,
        transform: 'none',
        // width: '110%',
      },
  });
  
  export const StyledCopyright = styled(Box)({
      fontSize: '1.1rem',
      fontFamily: "'Open Sans'",
      fontWeight: 'bold'
  });
  
  export const StyledSocialIcons = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  
  export const StyledIconButton = styled(IconButton)({
    color: '#fff',
    '&:hover': {
      color: Colors.secondary,
    },
  });