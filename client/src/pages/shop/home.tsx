import React from "react";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addProductToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { UseDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";

type homeProps = {};

const ShoppingHome: React.FC<homeProps> = () => {
  const slides = [bannerOne, bannerTwo, bannerThree];

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
              className={`absolute top-0 left-0 transition-opacity duration-1000`}
            />
          ))}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by category
            </h2>
          </div>
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
          </div>
        </section>
      </div>
    </ShoppingLayout>
  );
};
export default ShoppingHome;
