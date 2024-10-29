import React, { useEffect } from "react";
import { useRouter } from "next/router";

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
    const redirectTo = () => {
      // Handle home route
      if (pathname === "/") {
        return isAuthenticated ? (user?.role === "admin" ? "/admin/dashboard" : "/shop/home") : "/auth/login";
      }

      // Handle login and register routes
      if (!isAuthenticated && !pathname.includes("/login") && !pathname.includes("/register")) {
        return "/auth/login";
      }

      if (isAuthenticated && (pathname.includes("/login") || pathname.includes("/register"))) {
        return user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
      }

      // Handle admin access control
      if (isAuthenticated && user?.role !== "admin" && pathname.includes("admin")) {
        return "/unauth";
      }

      // Handle shop access control
      if (isAuthenticated && user?.role === "admin" && pathname.includes("shop")) {
        return "/admin/dashboard";
      }

      return null; // No redirection needed
    };

    const pathToRedirect = redirectTo();
    if (pathToRedirect) {
      router.push(pathToRedirect);
    }
  }, [isAuthenticated, pathname, router, user?.role]);

  return <>{children}</>;
};

export default CheckAuth;
