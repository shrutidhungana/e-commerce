import React from 'react';
import {  CartItems } from '@/types';
import Image from 'next/image';
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from '../ui/button';

type UserCartItemsContentProps = {
    cartItem: CartItems
};

const UserCartItemsContent: React.FC<UserCartItemsContentProps> = ({ cartItem }) => {
  
  
    return (
      <div className="flex items-center space-x-4">
        <Image
          src={cartItem?.image}
          alt={cartItem?.title}
          width={50}
          height={50}
          objectFit="cover"
          className="rounded cursor-pointer"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItem?.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              disabled={cartItem?.quantity === 1}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItem?.quantity}</span>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            ).toFixed(2)}
          </p>
          <Trash className="cursor-pointer mt-1" size={20} />
        </div>
      </div>
    );
};
export default UserCartItemsContent;