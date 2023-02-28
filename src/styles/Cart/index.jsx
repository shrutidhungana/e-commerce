import { Colors } from "../theme";
import { styled } from '@mui/material/styles';
import {  TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(() => ({
    border: '2px solid',
    borderColor: Colors.secondary,
}));
  
export const StyledTableRow = styled(TableRow)(() => ({
    border: '2px solid',
    borderColor: Colors.secondary
    
  }));
  
  export const StyledTableHead = styled(TableHead)(() => ({
    border: '2px solid',
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  }));
  
  
  export const StyledTableCell = styled(TableCell)(() => ({
    color: Colors.white,
    fontFamily: '"Open Sans", "sans serif"',
    fontSize: '20px',
  }));
  
  export const StyledTableCells = styled(TableCell)(() => ({
    color: Colors.secondary,
    fontFamily: '"Open Sans", "sans serif"',
      fontSize: '16px',
    fontWeight: 'bold',
  }));
  
 

  export const RemoveButton = styled(Button)(() => ({
    marginTop: '20px',
    alignSelf: 'center',
    fontFamily: '"Open Sans", "Sans Serif"',
    borderRadius: '4px',
    backgroundColor: Colors.secondary,
    '&:hover': {
      backgroundColor: Colors.secondaryHover,
    }
  }));

export const Empty = styled('div')({
    display: 'flex',
    margin: '20%',
    fontSize: '30px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
});

export const QuantityWrapper = styled('div')({
    display: 'flex',
});

export const QuantityWrapperNumber = styled('p')({
    padding: '0 10px',
    fontFamily: '"Open Sans"',
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '17px'
});

