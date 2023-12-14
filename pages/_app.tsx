import "../styles/globals.css";

import Head from "next/head";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Header from "../components/header";
import { Toaster } from "../components/ui/toaster";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}
