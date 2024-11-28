import React from 'react';
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

type StarRatingProps = {
    
};

const StarRatingComponent:React.FC<StarRatingProps> = () => {
    
    return [1, 2, 3, 4, 5]?.map((star) => (
        <Button key={star} variant="outline" size="icon">
            <StarIcon />
      </Button>
    ));
}
export default StarRatingComponent;