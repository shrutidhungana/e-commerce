import { styled } from '@mui/material/styles';
import { Colors } from '../theme';
import { Button, DialogTitle,TextField } from '@mui/material';

export const StyledButton = styled(Button)(() => ({
    marginTop: "3px",
    fontFamily: '"Open Sans", "Sans Serif"',
    backgroundColor: Colors.primary,
    color: Colors.white,
    "&:hover": {
      backgroundColor: Colors.primaryHover,
    },
}));
  
export const StyledDialogTitle = styled(DialogTitle)(() => ({
    color: Colors.secondary,
    fontFamily: '"Open Sans"',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '25px',
}));

export const StyledTextField = styled(TextField)(() => ({
    
        
        '& input': {
          color: Colors.secondary,
        },
      
    '& label': {
        color: Colors.secondary,
        fontFamily: '"Open Sans"',
        fontWeight: 600,
    },
  }));



