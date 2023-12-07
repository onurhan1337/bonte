import "../styles/globals.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";

import Header from "../components/header";
import { Toaster } from "../components/ui/toaster";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Clone and deploy your own Next.js portfolio in minutes."
        />
        <title>Anasayfa - Bonte</title>
      </Head>

      <Header />

      <main className="py-14">
        <Component {...pageProps} />
        <Toaster />
      </main>
    </Auth0Provider>
  );
}
