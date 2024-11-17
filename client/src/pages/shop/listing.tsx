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
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Filters, FilterParams } from "@/types";
import { useRouter } from "next/router";

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

  const { productList, productDetails } = useSelector((state: RootState) => state.shopProducts);

  

  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<string>("");
  const { query } = router;

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

  function handleGetProductDetails(getCurrentProductId: string) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }


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

  return (
    <ShoppingLayout>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
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
            {productList && productList.length > 0
              ? productList?.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </ShoppingLayout>
  );
};
export default ShoppingListing;
