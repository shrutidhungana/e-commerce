
import { IconButton, List, Typography, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Colors, DrawerWidth } from '../theme';
import { Link } from "react-router-dom";

export const AppbarContainer = styled(Box)(() => ({
      width: '98vw',
    backgroundColor: Colors.primary,
    display: 'flex',
    marginTop: 2,
     marginLeft: '-156px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 10px'
}));

export const AppbarHeader = styled(Typography)(() => ({
    padding: '4px',
    flexGrow: 1,
    fontSize: "4em",
    fontFamily: '"Open Sans", "cursive"',
    color: Colors.secondary,
    "&:hover": {
        color: Colors.secondaryHover,
    },
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
    display: 'flex',
    background: Colors.shaft,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,  
    borderTop: `1px solid ${Colors.border}`
  }));
  
  export const ActionIconsContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
  }));
  
  export const MyList = styled(List)(({ type }) => ({
      display: type === "row" ? "flex" : "block",
      flexGrow: 3,
    justifyContent: "space-between",
      alignItems: "center",
       color: Colors.secondary
  }));
  
  
  
  export const DrawerCloseButton = styled(IconButton)(() => ({
    position: 'absolute',
    top: 10,
    left: DrawerWidth,
    zIndex: 1999,      
  }));

export const StyledLink = styled(Link)(() => ({
    color: Colors.secondary,
    textDecoration: 'none',
    fontFamily: '"Open Sans","Sans Serif"',
    
    '&:hover': {
        backgroundColor: Colors.secondaryHover,
    
    },
}));
    
export const StyledListItemText = styled(ListItemText)(() => ({
    fontSize: 50,
    color: Colors.secondary,
    '&:hover': {
        backgroundColor: Colors.secondaryHover,
       color: Colors.white,
        padding: '10px',
        
    },
    }))
