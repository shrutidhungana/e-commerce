import { Divider, ListItemButton, ListItemIcon, Badge } from '@mui/material';
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from '../../../styles/Header';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Colors } from '../../../styles/theme';
import { CartContext } from '../../../context/Cart';
import { useContext } from 'react';
export default function Actions({ matches }) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
      <Component>
        <MyList type="row">
          <ListItemButton
            sx={{
              justifyContent: "flex-start",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: matches && Colors.secondary,
              }}
            >
              <Badge badgeContent={cartItemCount}
                sx={{
                  color: Colors.secondary,
                  
                }}
              >
                <AddShoppingCartIcon />
                </Badge>
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
       
            
        </MyList>
      </Component>
    );
  }