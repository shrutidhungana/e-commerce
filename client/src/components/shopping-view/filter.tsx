import React from 'react';
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filters } from '@/types';


type filterProps = {
  filters: Filters;
  handleFilter: (getSectionId: string, getCurrentOption: string) => void;
};

const ProductFilter:React.FC<filterProps> = ({filters, handleFilter}) => {
 
    return (
      <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className="p-4 space-y-4">
          {Object.keys(filterOptions)?.map((keyItem) => (
            <>
              <div key={keyItem}>
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem]?.map((option) => (
                    <Label
                      className="flex font-medium items-center gap-2"
                      key={option?.id}
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters)?.length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem]?.indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          ))}
        </div>
      </div>
    );
}
export default ProductFilter;