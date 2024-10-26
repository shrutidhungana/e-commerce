import React from 'react';
import Image from "next/image";

type notfoundProps = {
    
};

const NotFound:React.FC<notfoundProps> = () => {
    
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images.jpeg" // Use a background image for effect
            alt="Background pattern"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>

        <div className="mt-8">
          <Image
            src="/404.jpeg"
            alt="404 illustration"
            width={256}
            height={144}
            className="h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        <div className="m-6">
          <p className="text-lg text-center mb-6">
            The page you are looking for does not exist. It might have been
            removed, or you might have entered the wrong URL.
          </p>
        </div>
      </div>
    );
}
export default NotFound;