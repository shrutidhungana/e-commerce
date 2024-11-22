import React, { useEffect, useState } from "react";
import ShoppingLayout from "@/components/shopping-view/layout";
import bannerOne from "@/assests/banner-1.webp";
import bannerTwo from "@/assests/banner-2.webp";
import bannerThree from "@/assests/banner-3.webp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon, 
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  BookUser,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addProductToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useToast } from "@/hooks/use-toast";
import { Response, CurrentItem } from "@/types";

type homeProps = {};

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
  { id: "ethnic", label: "Ethnic", icon: BookUser },
];

const ShoppingHome: React.FC<homeProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const { productList, productDetails } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);

  const slides = [bannerOne, bannerTwo, bannerThree];
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

  const handleGetProductDetails = (getCurrentProductId: string) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };
    
    
    const handleNavigateToListingPage = (getCurrentItem:CurrentItem, section: string) => {
        
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section]: [getCurrentItem.id],
        };
        
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        router.push(`/shop/listing`)
    }

  const handleAddToCart = (getCurrentProductId: string) => {
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
        });
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides?.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <ShoppingLayout>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
          {slides?.map((slide, index) => (
            <Image
              key={index}
              src={slide}
              alt={`Banner ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0  transition-opacity duration-1000`}
            />
          ))}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
              )
            }
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
            onClick={() =>
              setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
            }
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoriesWithIcon.map((categoryItem) => (
                <Card
                  key={categoryItem?.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {brandsWithIcon.map((brandItem) => (
                <Card
                  key={brandItem?.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    handleNavigateToListingPage(brandItem, "brand")
                  }
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Feature Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                ? productList.map((productItem) => (
                    <ShoppingProductTile
                      key={productItem?._id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
                : null}
            </div>
          </div>
        </section>
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
export default ShoppingHome;
