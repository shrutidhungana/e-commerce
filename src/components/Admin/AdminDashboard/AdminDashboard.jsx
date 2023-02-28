import { useState } from "react";
import { useQuery } from "react-query";
import { Box, Table, TableBody, Paper, IconButton } from "@mui/material";
import { StyledTableContainer,StyledProgress,StyledEdit, StyledDelete, StyledTableRow, StyledTableHead, StyledTableCell,StyledTableCells} from "../../../styles/AdminDashboard";
import Pagination from "../Pagination/Pagination";


const apiUrl = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
    return data;
};

const AdminDashboard = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useQuery("products", fetchProducts);
    
   
      
    if (isLoading) {
        return <StyledProgress />;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }
        
  
    const productsPerPage = 10;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const products = data.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
   
   
    return (
      <Box sx={{ p: 2 }}>
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCells>
                    <img src={product.image} alt={product.title} width="50" height="50" />
                  </StyledTableCells>
                  <StyledTableCells>{product.title}</StyledTableCells>
                  <StyledTableCells>${product.price}</StyledTableCells>
                  <StyledTableCells>
                    <IconButton aria-label="edit">
                      <StyledEdit />
                    </IconButton>
                  </StyledTableCells>
                  <StyledTableCells>
                          <IconButton aria-label="delete"
                         
                          >
                      <StyledDelete  />
                    </IconButton>
                  </StyledTableCells>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
            </StyledTableContainer>
            <Pagination page={page} count={data.length} onChange={handlePageChange} />
      </Box>
    );
};
  
export default AdminDashboard;