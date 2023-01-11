import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import Maintenance from "@/components/Maintenance";
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* o.g */}
        <meta property="og:title" content="Fundsmith AI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.fundsmith.ai/" />
        {/* <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:image:alt" content="Fundsmith AI" /> */}
        <meta
          property="og:description"
          content="An A.I. writing assistant for fundraisers."
        />

        {/* TODO: implement twitter meta data */}
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          variables: {
            colorPrimary: "#00ABB3",
            colorDanger: "#FC5185",
            colorSuccess: "#57886C",
            colorBackground: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            borderRadius: "0.5rem",
          },
        }}
      >
        {process.env.NEXT_PUBLIC_SHOW_MAINTENANCE_PAGE === "true" ? (
          <Maintenance />
        ) : (
          <Layout>
            <Component {...pageProps} />
            <Toaster position="bottom-left" reverseOrder={true} />
          </Layout>
        )}
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(App);
