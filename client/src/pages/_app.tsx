import React from 'react'
import store, { RootState } from "@/store/store";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import CheckAuth from "@/components/common/checkAuth";
import { Toaster } from "@/components/ui/toaster";


type AuthWrapperProps = {
  children: React.ReactNode; // Specify the type for children
}

function AuthWrapper({ children }: Readonly<AuthWrapperProps>) {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
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
