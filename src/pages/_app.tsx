import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import {
  createBrowserSupabaseClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { trpc } from "../utils/trpc";

const App = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </SessionContextProvider>
    </>
  );
};

export default trpc.withTRPC(App);
