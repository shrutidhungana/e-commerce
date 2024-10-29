import store from "@/store/store";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import CheckAuth from "@/components/common/checkAuth";


export default function App({ Component, pageProps }: AppProps) {

const isAuthenticated = false; // Replace with actual logic to check if user is authenticated
const user = null; 
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
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <Component {...pageProps} /> {/* Render the page component */}
      </CheckAuth>
    </Provider>
  );
}
