import React from "react";
import Image from "next/image"; 
import { FaLock } from "react-icons/fa";


type UnauthProps = {};

const UnauthPage: React.FC<UnauthProps> = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/unauth.jpeg" // Unsplash image URL
          alt="Background pattern"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="bg-white shadow-2xl rounded-lg p-8 md:p-12 text-center max-w-md transform hover:scale-105 transition-transform duration-300">
        <FaLock className="text-red-500 text-5xl mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 text-lg mb-6">
          Sorry, you don’t have permission to view this page.
        </p>
      </div>
    </div>
  );
};
export default UnauthPage;
