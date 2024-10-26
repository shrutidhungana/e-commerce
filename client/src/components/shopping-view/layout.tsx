import React from "react";
import ShoppingHeader from "./header";

type layoutProps = {
  children: React.ReactNode;
};

const ShoppingLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
          {/* common header */}
          <ShoppingHeader />
      <main className="flex flex-col w-full">{children}</main>
    </div>
  );
};
export default ShoppingLayout;
