import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Product, Response } from "@/types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setProductDetails } from "@/store/shop/products-slice";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "@/hooks/use-toast";
import Empty from "../common/Empty";

type productDetailsProps = {
  productDetails: Product | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddToCart: (getCurrentProductId: string, getTotalStock: string) => void;
};

const ProductDetailsDialog: React.FC<productDetailsProps> = ({
  productDetails,
  open,
  setOpen,
  handleAddToCart,
}) => {
  const salePrice = parseFloat(productDetails?.salePrice ?? "0");
  const price = parseFloat(productDetails?.price ?? "0");
  const totalStock = parseFloat(productDetails?.totalStock ?? "0");

  const [reviewMsg, setReviewMsg] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const { reviews } = useSelector((state: RootState) => state.shopReview);
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleRatingChange = (getRating: number) => {
    setRating(getRating);
  };



  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id ?? "",
        userId: user?.user?.id ?? "",
        userName: user?.user?.userName ?? "",
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      const response = data as Response;
      if (
        response.meta.requestStatus === "fulfilled" &&
        response.payload?.success
      ) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id ?? ""));
        toast({
          title: "Success!",
          description: response.payload.message,
          duration: 5000,
          className: "bg-green-500 text-white",
        });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id??""));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 p-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] 
      w-full h-screen overflow-auto">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          {productDetails?.image &&
            typeof productDetails?.image === "string" && (
              <Image
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                objectFit="cover"
                className="aspect-square w-full"
              />
            )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>

          <div className="flex items-center justify-between">
            <p
              className={`${
                salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              ${price}
            </p>
            {salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${salePrice}
              </p>
            ) : null}
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            {/* ... rating stars and average rating */}
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-5 mb-5">
            {totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id ?? "",
                    productDetails?.totalStock ?? ""
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          {/* Reviews */}
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem?.id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <Empty
                  title="No Reviews"
                  description="You can add review from below!"
                />
              )}
            </div>
            {/* ... review list */}
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                placeholder="Write A Review"
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
