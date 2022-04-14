// import "../styles/globals.css";
import "../styles/styles.scss";
import NextNprogress from "nextjs-progressbar";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
