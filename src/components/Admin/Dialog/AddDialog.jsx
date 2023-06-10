import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
 
} from "@mui/material";
import { StyledButton, StyledDialogTitle, StyledTextField } from "../../../styles/Dialog";

const AddDialog = ({ open, handleClose, handleAddProduct }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  
  const handleAddClick = () => {
   
    handleAddProduct({ title, price, image });
    setTitle("");
    setPrice("");
    setImage("");
    handleClose();
  };
    

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Add Product</StyledDialogTitle>
      <DialogContent>
        <StyledTextField
          label="Title"
          name="title"
          type = "text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Price"
          name="price"
          type = "number"
          value={price}
          onChange={(event) => setPrice(event.target.value) }
          fullWidth
          margin="normal"
        />
     

        <StyledTextField
        label="Image"
        name="Image"
          value={image}
          type = "url"
        onChange={(event) => setImage(event.target.value)}
        fullWidth
        margin="normal"
      />
      {image && (
        <img
          src={image}
          alt="title"
          style={{ maxWidth: "100%", marginTop: "1rem" }}
        />
      )}
       
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClose}>
          Cancel
        </StyledButton>
        <StyledButton onClick={handleAddClick}>
          Add
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;