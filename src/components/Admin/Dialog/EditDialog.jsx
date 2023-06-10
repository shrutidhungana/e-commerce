import { useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import {
  StyledButton,
  StyledDialogTitle,
  StyledTextField,
} from "../../../styles/Dialog";

const EditDialog = ({ open, handleClose, product, handleUpdate }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setEditedProduct((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    handleUpdate(editedProduct);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Edit Product</StyledDialogTitle>
      <DialogContent>
        <StyledTextField
          margin="dense"
          label="Title"
          fullWidth
          name="title"
          value={editedProduct.title}
          onChange={handleInputChange}
        />
        <StyledTextField
          margin="dense"
          label="Price"
          fullWidth
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />
        <StyledTextField
          margin="dense"
          fullWidth
          name="image"
          value={editedProduct.image}
          onChange={handleInputChange}
        />

        <StyledTextField
          margin="dense"
          fullWidth
          type="file"
          accept="image/*"
          onChange={handleImageInputChange}
        />
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClose}>Cancel</StyledButton>
        <StyledButton onClick={handleSave}>Save</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
