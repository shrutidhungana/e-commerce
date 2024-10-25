import store from "@/store/store";
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>TrendHive</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="One store for men,women and child" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
