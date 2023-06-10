import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const LoginWrapper = styled("div")({
  display: "flex",
  // flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "80px",
});
export const LoginContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "500px",
  border: "3px solid",
  borderColor: Colors.primary,
  borderRadius: "14px",
  width: "400px",
});

export const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const LoginButton = styled(Button)({
  width: "100%",
  marginTop: "1rem",
  backgroundColor: Colors.secondary,
  color: Colors.white,
  fontFamily: '"Open Sans" ',
  fontSize: "18px",
  "&:hover": {
    backgroundColor: Colors.secondaryHover,
  },
});

export const Title = styled("h1")({
  fontFamily: '"Open Sans"',
  color: Colors.secondary,
});

export const Input = styled("input")(() => ({
  border: "3px solid",
  borderColor: Colors.secondary,
  padding: "7px 5px",
  borderRadius: "4px",
  // margin: '10px',
  fontFamily: '"Open Sans"',
  fontSize: "16px",
  "&::placeholder": {
    color: Colors.secondaryHover,
    textAlign: "center",
  },
}));

export const Icon = styled(AccountBoxIcon)(() => ({
  fontSize: "100px",
  color: Colors.secondary,
  cursor: "pointer",
  "&:hover": {
    color: Colors.secondaryHover,
  },
}));
