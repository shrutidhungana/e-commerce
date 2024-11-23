import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";




const Home: React.FC = () => {
   const [showSplash, setShowSplash] = useState(false);
   const router = useRouter();

   // Timer for inactivity
   useEffect(() => {
     let inactivityTimeout: NodeJS.Timeout;
     const handleActivity = () => {
       setShowSplash(false);
       clearTimeout(inactivityTimeout);
       inactivityTimeout = setTimeout(
         () => setShowSplash(true),
         10 * 60 * 1000
       ); // 10 minutes
     };

     // Event listeners for user activity
     window.addEventListener("mousemove", handleActivity);
     window.addEventListener("keydown", handleActivity);
     window.addEventListener("mousedown", handleActivity);
     window.addEventListener("touchstart", handleActivity);

     // Start timer on mount
     inactivityTimeout = setTimeout(() => setShowSplash(true), 10 * 60 * 1000);

     // Cleanup on component unmount
     return () => {
       clearTimeout(inactivityTimeout);
       window.removeEventListener("mousemove", handleActivity);
       window.removeEventListener("keydown", handleActivity);
       window.removeEventListener("mousedown", handleActivity);
       window.removeEventListener("touchstart", handleActivity);
     };
   }, []);

   // Redirect when the splash is clicked or user becomes active
   useEffect(() => {
     if (!showSplash) return;
     const timeout = setTimeout(() => router.push("/auth/login"), 5000); // Auto redirect after 5s if splash is shown
     return () => clearTimeout(timeout);
   }, [showSplash, router]);

   return (
     <main className="min-h-screen flex items-center justify-center bg-black text-white">
       {showSplash ? (
         <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">Welcome to TrendHive</h1>
           <p className="text-lg mb-8">Your one-stop shop for everything!</p>
           <button
             onClick={() => router.push("/auth/login")}
             className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:bg-gray-300"
           >
             Continue to Login
           </button>
         </div>
       ) : (
         <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">Welcome to TrendHive</h1>
           <p className="text-lg">Redirecting you to your dashboard...</p>
         </div>
       )}
     </main>
   );
};

export default  Home 
