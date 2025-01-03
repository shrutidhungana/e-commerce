import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";     
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormControl} from "@/types";


type FormProps<T extends Record<string, string | undefined| number| File| null  >> = {
  formControls: FormControl[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isBtnDisabled?: boolean;
};

type ControlItem = FormControl & {
  name: string;
  placeholder?: string;
  componentType: "input" | "select" | "textarea"; // Add other component types as necessary
  type?: string;
  id?: string;
  // e.g., 'text', 'password', etc.
};

const CommonForm = <T extends Record<string, string | undefined | number | File| null>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}: FormProps<T>)=> {
  const renderInputsByComponentType = (getControlItem: ControlItem) => {
    let element: JSX.Element | null = null;
    const value = formData[getControlItem.name] ?? "";

    switch (getControlItem?.componentType) {
      case "input":
        element = (
          <Input
            type={getControlItem?.type}
            name={getControlItem?.name}
            placeholder={getControlItem?.placeholder}
            id={getControlItem?.name}
            value={String(value)}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem?.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={String(value)}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem?.placeholder}
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options?.length > 0
                ? getControlItem?.options?.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem?.name}
            placeholder={getControlItem?.placeholder}
            id={getControlItem?.id}
            value={String(value)}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem?.name]: e.target.value,
              })
            }
          />
        );

        break;
      default:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeholder}
            id={getControlItem?.name}
            type={getControlItem?.type}
            value={String(value)}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem?.name]: e.target.value,
              })
            }
          />
        );
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls?.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem?.name}>
            <Label className="mb-1">{controlItem?.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
export default CommonForm;
