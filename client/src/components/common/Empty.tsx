import React from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"; // ShadCN Button component

type EmptyProps = {
  title: string;
  description?: string;
  buttonText?: string; // Optional button text
  buttonLink?: string; // Optional button link
  variant?: "card" | "sheet" | "table" | "default"; // Different layout options
};

const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  buttonText,
  buttonLink = "/",
  variant = "default",
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(buttonLink);
  };

  const content = (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      {description && (
        <p className="text-sm text-gray-700 mt-2">{description}</p>
      )}
      {buttonText && (
        <Button
          variant="outline"
          className="mt-4 px-6 py-2 text-sm text-black border border-gray-300 hover:bg-gray-100"
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );

  if (variant === "card") {
    return (
      <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-black text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {description && <p className="text-gray-700">{description}</p>}
          {buttonText && (
            <Button
              variant="outline"
              className="mt-4 text-black border border-gray-300 hover:bg-gray-100"
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "sheet") {
    return (
      <Sheet>
        <SheetHeader>
          <SheetTitle className="text-black">{title}</SheetTitle>
        </SheetHeader>
        <SheetContent className="text-center text-gray-700">
          {description && <p>{description}</p>}
          {buttonText && (
            <Button
              variant="outline"
              className="mt-4 text-black border border-gray-300 hover:bg-gray-100"
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  if (variant === "table") {
    return (
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-lg font-semibold text-black">
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sm text-gray-700 py-2">{description}</td>
            </tr>
          </tbody>
        </table>
        {buttonText && (
          <Button
            variant="outline"
            className="mt-4 text-black border border-gray-300 hover:bg-gray-100"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  }

  // Default variant (standalone view)
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-lg p-6">
      {content}
    </div>
  );
};

export default Empty;
