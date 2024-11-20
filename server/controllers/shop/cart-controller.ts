import Cart from "../../modals/Cart";
import Product, {IProduct} from "../../modals/Product";
import { Request, Response } from "express";



const addToCart = async (
  req: Request,
  res: Response
): Promise<void | Response> => { 
    try {
        const { userId } = req.params;
        
       if (!userId) {
         return res
           .status(400)
           .json({
             success: false,
             message: "User id is manadatory!",
           })
           
       } 

        const cart = await Cart.findOne({ userId }).populate({
          path: "items.productId",
          select: "image title price salePrice",
        });

        if (!cart) {
          return res.status(404).json({
            success: false,
            message: "Cart not found!",
          });
        }

        const validItems = cart.items.filter(
          (productItem) => productItem.productId
        );

        if (validItems.length < cart.items.length) {
          cart.items = validItems;
          await cart.save();
        }

        const populateCartItems = validItems.map((item) => ({
          productId: item.productId._id,
          image: item.productId.image,
          title: item.productId.title,
          price: item.productId.price,
          salePrice: item.productId.salePrice,
          quantity: item.quantity,
        }));

        res.status(200).json({
          success: true,
          data: {
            ...cart.toObject(),
            items: populateCartItems,
          },
        });


    } catch {
        res.status(500).json({
          success: false,
          message: "Error",
        });
    }
};

const fetchCartItems = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
    try {
        
    } catch {
        res.status(500).json({
          success: false,
          message: "Error",
        });
    }
};


const updateCartItemQuantity = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
  } catch {
      res.status(500).json({
        success: false,
        message: "Error",
      });
  }
};

const deleteCartItems = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
  } catch {
      res.status(500).json({
        success: false,
        message: "Error",
      });
  }
};

export {addToCart, fetchCartItems, updateCartItemQuantity,deleteCartItems}