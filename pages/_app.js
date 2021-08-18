import "../styles/globals.css";
import "../styles/styles.scss";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
