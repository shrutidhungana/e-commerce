import React from 'react';
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {RootState} from "../../store/store"

type OrderDetailsProps = {
    
};

const ShoppingOrderDetailsView: React.FC<OrderDetailsProps> = () => {
    const { user } = useSelector((state:RootState) => state.auth);
    
    return (
        <DialogContent>
            Hello
        </DialogContent>
    );
}
export default ShoppingOrderDetailsView;