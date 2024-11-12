import Product from "../../modals/Product";
import { Request, Response } from "express";

const getFilteredProducts = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    // Define filters as an object with string keys and any values
    let filters: { [key: string]: any } = {};

    if (category) {
      filters.category = { $in: category.toString().split(",") };
    }

    if (brand) {
      filters.brand = { $in: brand.toString().split(",") };
    }

    let sort: { [key: string]: 1 | -1 } = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    return res.status(200).json({
      success: true,
        data: products,
      message: "Successfully rendered products"
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export {getFilteredProducts}