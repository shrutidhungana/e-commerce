import {
  
    
    Button
  } from "@mui/material";
  import {
    
    AppbarContainer,
    AppbarHeader,
    MyList,
    StyledLink,
    StyledListItemText
    
  } from "../../../styles/Header";
 
 
  import Actions from "./actions";

  
  export default function AppbarDesktop({ matches }) {
    
    
  
    return (
      <AppbarContainer>
        <AppbarHeader variant="h2">Wearable Tech</AppbarHeader>
            <MyList type="row">
                
                <StyledLink  to="/products"><StyledListItemText primary="Products"/></StyledLink>
                <StyledLink to = "/authenticate">
                        <StyledListItemText primary="Authenticate" /></StyledLink>
         <StyledLink to="/cart"><StyledListItemText primary="Cart" /></StyledLink>
            
                                 
            </MyList>
            
         <Actions matches={matches} />   
      </AppbarContainer>
    );
  }