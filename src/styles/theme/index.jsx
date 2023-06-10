import { createTheme } from "@mui/material/styles";

export const DrawerWidth = 250;

export const Colors = {
  primary: "#D23F57",
  primaryHover: "#E3364E",
  secondary: "#0F3460",
  secondaryHover: "#0F2860",

  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

  typography: {
    fontFamily: '"Open Sans", "sans-serif"',
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          background: Colors.primary,
        },
        arrow: {
          color: Colors.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DrawerWidth,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `1px solid ${Colors.primary}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: Colors.primaryHover,
        },
      },
    },
  },
});

export default theme;
