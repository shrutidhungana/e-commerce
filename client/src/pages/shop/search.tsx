import React, { useEffect, useState } from "react";
import ShoppingLayout from "../../components/shopping-view/layout";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useToast } from "../../hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addProductToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetails } from "../../store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "../../store/shop/search-slice";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import Empty from "../../components/common/Empty";
import { Response, Cart } from "../../types";

type SearchProps = {};

const SearchProducts: React.FC<SearchProps> = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useSelector((state: RootState) => state.shopSearch);
  const { productDetails } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { toast } = useToast();

  const { query } = router;
  useEffect(() => {
    const { keyword: queryKeyword } = query;

    if (queryKeyword && typeof queryKeyword === "string") {
      setKeyword(queryKeyword);
    }
  }, [query]);

  useEffect(() => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && trimmedKeyword.length > 2) {
      const timeout = setTimeout(() => {
        router.push(`/shop/search?keyword=${trimmedKeyword}`);
        dispatch(getSearchResults(trimmedKeyword));
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (trimmedKeyword === "") {
      // Clear the results only if the search is emptied out
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch]);

  const handleAddToCart = (
    getCurrentProductId: string,
    getTotalStock: string
  ) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item: Cart) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item.`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addProductToCart({
        userId: user?.user?.id ?? "",
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      const response = data as Response;
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        dispatch(fetchCartItems(user?.user?.id ?? ""));
        toast({
          title: "Success!",
          description: response.payload.message,
          duration: 5000,
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Error!",
          description: response.error?.message,
          duration: 5000,
          variant: "destructive",
          className: "text-white",
        });
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId: string) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <ShoppingLayout>
      <div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full flex items-center">
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="py-6"
              placeholder="Search Products..."
            />
          </div>
        </div>
        {!searchResults.length && (
          <Empty
            title="No Search Result"
            description="Start Searching for something! You can search through title, category, brand, description."
            variant="card"
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchResults.map((item) => (
            <ShoppingProductTile
              key={item?.id}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </ShoppingLayout>
  );
};
export default SearchProducts;
