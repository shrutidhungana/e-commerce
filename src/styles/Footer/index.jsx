import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/system";
import { Colors, DrawerWidth } from '../theme';
import { Link } from "react-router-dom";



export const StyledFooter = styled(Box)(() => ({
    backgroundColor: Colors.primary,
    padding: '3px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const StyledLink = styled(Link)(() => ({
    color: Colors.secondary,
}));

export const StyledIconButton = styled(IconButton)(() => ({
    color: Colors.white,
    padding: '50%',
}));
  
export const StyledTypography = styled(Typography)(() => ({
    color: Colors.secondary,
    fontSize: '20px',
}))