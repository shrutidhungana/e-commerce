import React, { useEffect, useState } from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import ProductFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Filters, FilterParams, Response, Cart } from "@/types";
import { useRouter } from "next/router";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addProductToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import Empty from "@/components/common/Empty";

type listingProps = {};

const createSearchParamsHelper = (filterParams: FilterParams): string => {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const ShoppingListing: React.FC<listingProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { productList, productDetails } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);

  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<string>("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const { query } = router;
  const { toast } = useToast();

  const categorySearchParam = query.category as string | undefined;


  

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleFilter = (getSectionId: string, getCurrentOption: string) => {
    let cpyFilters = { ...filters };

    if (!cpyFilters[getSectionId]) {
      cpyFilters[getSectionId] = [];
    }

    if (Array.isArray(cpyFilters[getSectionId])) {
      const indexOfCurrentOption =
        cpyFilters[getSectionId]?.indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleGetProductDetails = (getCurrentProductId: string) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId: string, getTotalStock: string) => {
  
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
        dispatch(fetchCartItems(user?.user?.id ?? ''));
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

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = sessionStorage.getItem("filters");
   
    setFilters(savedFilters ? JSON.parse(savedFilters) : {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters)?.length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      router.push({
        pathname: router.pathname,
        query: {
          ...query,
          ...Object.fromEntries(new URLSearchParams(createQueryString)),
        },
      });
    }
  }, [filters]);



  useEffect(() => {
    if (productDetails !== null ) {
      setOpenDetailsDialog(true);
      
    }
  }, [productDetails]);

  
const categoryLabel = () => {
  switch (categorySearchParam) {
    case "men":
      return "Men";
    case "women":
      return "Women";
    case "kids":
      return "Kids";
    case "accessories":
      return "Accessories";
    case "footwear":
      return "Footwear";
    default:
      return "All Products";
  }
};


  return (
    <ShoppingLayout>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">{categoryLabel()}</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList?.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions?.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        className="flex items-center space-x-2"
                      >
                        <span className="inline-block w-4 h-4 border-2 border-gray-300 rounded-full"></span>{" "}
                        <span>{sortItem.label}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0 ? (
              productList?.map((productItem) => (
                <ShoppingProductTile
                  key={productItem?._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <Empty
                title="No Products found found."
                description="Please,wait until some products are added."
                variant="card"
              />
            )}
          </div>
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
export default ShoppingListing;
