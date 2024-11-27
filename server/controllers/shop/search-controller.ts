import Product from "../../modals/Product";
import { Request, Response } from "express";

const searchProducts = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false,
        message: "Keyword is required and must be in string format",
      });
    }

   const regEx = new RegExp(`\\b${keyword}\\b`, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { searchProducts };
