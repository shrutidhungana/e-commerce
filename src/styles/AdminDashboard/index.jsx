import { Colors } from "../theme";
import { styled } from "@mui/material/styles";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

export const StyledTableContainer = styled(TableContainer)(() => ({
  border: "2px solid",
  borderColor: Colors.secondary,
  height: 'auto'
}));

export const StyledTableRow = styled(TableRow)(() => ({
  border: "2px solid",
  borderColor: Colors.secondary,
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
  fontFamily: '"Open Sans"',
  fontSize: "16px",
  fontWeight: "bold",
}));

export const StyledProgress = styled(CircularProgress)(() => ({
  color: Colors.secondary,
  width: "10rem",
  height: "10rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const LogoutDiv = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


export const StyledEdit = styled(Edit)(() => ({
  color: Colors.secondary,
  fontWeight: "bold",
}));

export const StyledDelete = styled(Delete)(() => ({
  color: Colors.secondary,
  fontWeight: "bold",
}));

export const AddDiv = styled('div')({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})
