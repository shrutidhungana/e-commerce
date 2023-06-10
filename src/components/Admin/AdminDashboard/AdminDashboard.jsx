import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Table,
  TableBody,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import {
  StyledTableContainer,
  StyledProgress,
  StyledEdit,
  StyledDelete,
  StyledTableRow,
  StyledTableHead,
  StyledTableCell,
  StyledTableCells,
  AddDiv,
} from "../../../styles/AdminDashboard";
import Pagination from "../Pagination/Pagination";
import { apiUrl } from "../../../API/API";
import EditDialog from "../Dialog/EditDialog";
import AddDialog from "../Dialog/AddDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminDashboard = () => {
  const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery("products", fetchProducts);

  const [products, setProducts] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleDelete = (id) => {
    const updatedProducts = [...products].filter(
      (product) => product.id !== id
    );
    setProducts(updatedProducts);
    const totalPages = Math.ceil(updatedProducts.length / productsPerPage);
    if (page > totalPages) {
      setPage(totalPages);
    }

    toast.success("Item deleted!", { autoClose: 5000 });
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    const updatedProducts = [...products]?.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);

    toast.success("Item edited!", { autoClose: 5000 });
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddProduct = (newProduct) => {
    const id = Date.now();
    const productWithId = { ...newProduct, id };
    setProducts([...products, productWithId]);
    setIsAddDialogOpen(false);
    setPage(Math.ceil((products.length + 1) / productsPerPage));

    toast.success("Item added!", { autoClose: 5000 });
  };

  const productsPerPage = 10;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <StyledProgress />
      ) : error ? (
        <p>Error:{error.message}</p>
      ) : null}
      ;
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
            <TableBody key={products.length}>
              {productsToShow?.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCells>
                    <img
                      src={product.image}
                      alt={product.title}
                      width="50"
                      height="50"
                    />
                  </StyledTableCells>
                  <StyledTableCells>{product.title}</StyledTableCells>
                  <StyledTableCells>${product.price}</StyledTableCells>
                  <StyledTableCells>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(product)}
                    >
                      <StyledEdit />
                    </IconButton>
                  </StyledTableCells>
                  <StyledTableCells>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <StyledDelete />
                    </IconButton>
                  </StyledTableCells>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Pagination
          page={page}
          count={products?.length}
          onChange={handlePageChange}
        />
        <AddDiv>
          <Button variant="contained" onClick={handleAdd}>
            Add Products
          </Button>
        </AddDiv>

        {isEditDialogOpen && (
          <EditDialog
            open={isEditDialogOpen}
            handleClose={() => setIsEditDialogOpen(false)}
            product={editedProduct}
            handleUpdate={handleUpdate}
          />
        )}
        {isAddDialogOpen && (
          <AddDialog
            open={isAddDialogOpen}
            handleClose={() => setIsAddDialogOpen(false)}
            handleAddProduct={handleAddProduct}
          />
        )}
      </Box>
    </>
  );
};

export default AdminDashboard;
