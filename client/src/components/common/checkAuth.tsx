import React, {useEffect} from 'react';
import { useRouter } from 'next/router';

type CheckAuthProps = {
  isAuthenticated: boolean;
  user: { role: string } | null;
  children: React.ReactNode;
  
};

const CheckAuth: React.FC<CheckAuthProps> = ({

  isAuthenticated,
  user,
  children,
  
}) => {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
   if (pathname === "/") {
     if (!isAuthenticated) {
       router.push("/auth/login");
     } else if (user?.role === "admin") {
         router.push("/admin/dashboard");
       } else {
         router.push("/shop/home");
       }
   }
    if (
      !isAuthenticated &&
      !(pathname?.includes("/login") || pathname?.includes("/register"))
    ) {
       router?.push("/auth/login");
    }
   
 if (
      isAuthenticated &&
      (pathname?.includes('/login') || pathname?.includes('/register'))
 ) {
        if (user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/shop/home");
        }
 }
     if (
       isAuthenticated &&
       user?.role !== "admin" &&
       pathname.includes("admin")
     ) {
       router.push("/unauth");
     }
    if (
      isAuthenticated &&
      user?.role === "admin" &&
      pathname.includes("shop")
    ) {
      router.push("/admin/dashboard");
    }

  }, [isAuthenticated, pathname, router, user?.role]);
    
     return <>{children}</>;
  
};
export default CheckAuth;