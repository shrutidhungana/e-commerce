import { styled } from "@mui/material/styles";
import { AppBar, Typography, Button, Badge, Toolbar  } from "@mui/material";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../theme";

export const Navbar = styled(AppBar)({
  position: 'sticky',
  top: 0,
  backgroundColor: Colors.primary,
  boxShadow: "none",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
   borderBottom: '1px solid',
   borderBottomColor: Colors.primary,
  padding: '10px 60px',
   zIndex: 100,
  margin: 0,
  left: '9%',
  transform: 'translateX(-9%)',
  width: '120.5%',
 
  
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    padding: '10px',
    width: '100%'
  },
  '@media (max-width: 900px)': {
    padding: '10px 30px',
    left: '0',
    transform: 'none',
  
  },
});

export const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#333',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 600px)': {
    marginBottom: '10px',
    marginRight: '0',
  },
});

export const NavLinks = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  '@media (max-width: 960px)': {
    gap: '20px',
  },
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    gap: '10px',
  },
});

export const CartIcon = styled(ShoppingCartIcon)({
  color: Colors.white,
});

export const NavLinkItem = styled(NavLink)({
  textDecoration: 'none',
  color: Colors.white,
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

export const LogoutButton = styled(Button)(() => ({
  marginTop: "5px",
  
  alignSelf: "center",
  fontFamily: '"Open Sans"',
  borderRadius: "4px",
  backgroundColor: Colors.secondary,
  color: Colors.white,
  "&:hover": {
    backgroundColor: Colors.secondaryHover,
  },
}));

export const StyledBadge = styled(Badge)(() => ({
  backgroundColor:Colors.secondary,
  color:Colors.white,
  fontWeight: 'bold',
  fontSize: '1.2rem',
  borderRadius: 20,
  padding: '0.5rem',
}))