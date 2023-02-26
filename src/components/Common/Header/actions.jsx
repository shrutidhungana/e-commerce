import { Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from '../../../styles/Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Colors } from '../../../styles/theme';

export default function Actions({ matches }) {

    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  
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
              <ShoppingCartIcon />
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
         
            
        </MyList>
      </Component>
    );
  }