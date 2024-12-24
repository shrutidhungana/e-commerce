import React from "react";

type LayoutProps = {
  children: React.ReactNode; // Define children as a prop of type React.ReactNode
};

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to TrendHive
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {children} {/* Use the children prop here */}
      </div>
    </div>
  );
};

export default AuthLayout;
