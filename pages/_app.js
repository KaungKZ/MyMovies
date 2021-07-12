import "../styles/globals.css";
import "../styles/styles.scss";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Layout>
        <Component {...pageProps} />
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
