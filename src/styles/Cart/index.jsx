import { Colors } from "../theme";
import { styled } from "@mui/material/styles";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(() => ({
  
  border: "2px solid",
  borderColor: Colors.secondary,
}));

export const StyledTableRow = styled(TableRow)(() => ({
  border: "2px solid",
  borderColor: Colors.secondary,
  width: "100%",
}));

export const StyledTableHead = styled(TableHead)(() => ({
  border: "2px solid",
  borderColor: Colors.secondary,
  backgroundColor: Colors.secondary,
}));

export const StyledTableCell = styled(TableCell)(() => ({
  color: Colors.white,
  fontFamily: '"Open Sans"',
  fontSize: "20px",
}));

export const StyledTableCells = styled(TableCell)(() => ({
  color: Colors.secondary,
  fontFamily: '"Open Sans", "sans serif"',
  fontSize: "16px",
  fontWeight: "bold",
 
}));

export const RemoveButton = styled(Button)(() => ({
  padding: "10px 20px",
  cursor: "pointer",
  fontFamily: '"Open Sans"',
  borderRadius: "4px",
  backgroundColor: Colors.secondary,
  color: Colors.white,
  "&:hover": {
    backgroundColor: Colors.secondaryHover,
    color: Colors.white,
  },
}));

export const Empty = styled("div")({
  display: "flex",
  margin: "20%",
  fontSize: "30px",
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "center",
  color: Colors.primary,
});

export const QuantityWrapper = styled("div")({
  display: "flex",
});

export const QuantityWrapperNumber = styled("p")({
  padding: "0 10px",
  fontFamily: '"Open Sans"',
  color: Colors.secondary,
  fontWeight: "bold",
  fontSize: "18px",
});

export const QuantityButton = styled(Button)(() => ({
  padding: "2px",
  cursor: "pointer",
  fontFamily: '"Open Sans"',
  borderRadius: "4px",
  fontWeight: "bold",
  color: Colors.secondary,
  border: "2px solid",
  height: "25px",
  marginTop: "30px",
  minWidth: '45px',
  
}));

export const Total = styled("p")({
  fontFamily: '"Open Sans"',
  color: Colors.secondary,
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: 'center',
});

export const CheckoutButton = styled(Button)(() => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  border: "none",
  padding: "10px",
  marginTop: "10px",
  cursor: "pointer",
}));

export const TotalDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: "50px 0 0 "
});
