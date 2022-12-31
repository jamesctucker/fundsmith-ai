import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { ClerkProvider } from "@clerk/nextjs";
import { useEffect } from "react";
import "../styles/globals.css";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { trpc } from "../utils/trpc";

const App = ({ Component, pageProps }: AppProps) => {
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
      <ClerkProvider
        {...pageProps}
        appearance={{
          variables: {
            colorPrimary: "#2B7C5F",
            colorDanger: "#C5283D",
            colorSuccess: "#2B7C5F",
            colorBackground: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            borderRadius: "0.5rem",
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
          <Toaster position="bottom-left" reverseOrder={true} />
        </Layout>
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(App);
