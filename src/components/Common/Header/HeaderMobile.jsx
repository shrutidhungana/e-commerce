import { AppbarContainer, AppbarHeader } from "../../../styles/Header";
import MenuIcon from "@mui/icons-material/Menu";

import Actions from "./actions";
import { IconButton } from "@mui/material";
import { useUIContext } from "../../../context/UI";

export default function AppbarMobile({ matches }) {
  const { setDrawerOpen } = useUIContext();
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4">
        Wearable Tech
      </AppbarHeader>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}