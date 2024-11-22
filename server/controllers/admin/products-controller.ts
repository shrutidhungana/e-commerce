import { imageUploadUtil } from "../../helpers/cloudinary";
import { Request, Response } from "express";
import Product from "../../modals/Product";

const handleImageUpload = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    // Check if `req.file` exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
  
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// add a new product
const addProduct = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      // averageReview,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      //  averageReview,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product Added Successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
// fetch all products
const fetchAllProducts = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
      message: "All the products are received successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
// edit a product
const editProduct = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      //  averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    //  findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product is updated successfully.",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
// delete a product

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
