import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { ProductState, InitialProductFormData, Product, NewProductPayload, EditProductPayload } from "@/types";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";


const initialState: ProductState = {
  isLoading: false,
  productList: [],
};

const { addProducts, listProducts, editProduct, deleteProduct } = apiEndpoints;

export const addNewProduct = createAsyncThunk<Product, NewProductPayload>(
    "/products/addnewproduct",
    async (formData: InitialProductFormData) => {
        const result = await axios.post(addProducts, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result?.data;
    }
);

export const fetchAllProducts = createAsyncThunk<Array<Product>, NewProductPayload>(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(listProducts);
    return result?.data;
  }
);

export const editAddedProduct = createAsyncThunk<Product, EditProductPayload>(
  "/products/editProduct",
  async ({ id, formData }) => {
    // Correct URL string construction
    const result = await axios.put(
      `${editProduct?.replace(":id", id)}`, // Replace :id with the actual id
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data; // Ensure you're returning the data
  }
);

export const deleteAddedProduct = createAsyncThunk<Product, string>(
  "/products/deleteProduct",
  async (id: string) => {
    const result = await axios.delete(`${deleteProduct?.replace(":id", id)}`);
    return result?.data;
  }
);


const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(
            fetchAllProducts.fulfilled,
              (state, action: PayloadAction<Array<Product>>) => {
                console.log(action.payload)
              state.isLoading = false;
              state.productList = action.payload;
            }
          )
          .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
          });
        
  },
});

export default AdminProductsSlice.reducer;
