import React, { useEffect } from "react";
import store, { RootState, AppDispatch } from "@/store/store";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider, useSelector, useDispatch } from "react-redux";
import { checkAuth } from "@/store/auth-slice";
import CheckAuth from "@/components/common/checkAuth";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";

type AuthWrapperProps = {
  children: React.ReactNode; // Specify the type for children
};

function AuthWrapper({ children }: Readonly<AuthWrapperProps>) {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user?.user}>
      {children}
    </CheckAuth>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>TrendHive</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="One store for men, women and children"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Toaster />
      <AuthWrapper>
        <Component {...pageProps} /> {/* Render the page component */}
      </AuthWrapper>
    </Provider>
  );
}
