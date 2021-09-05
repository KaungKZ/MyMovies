import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GA_TRACKING_ID } from "../lib/ga/index";
import AllMoviesByCategory from "../components/AllMoviesByCategory";

export default function index(props) {
  const router = useRouter();

  // console.log(router.query);

  return (
    <>
      <Head>
        <title>{router.query.category}</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        {/* <meta charset="UTF-8" /> */}

        <meta property="og:title" content={router.query.category} />
        <meta
          name="description"
          content="Search any movies with different categories and movie detail along with the option to download into your device. Totally free to use and check it out to search your favourite movie !"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <AllMoviesByCategory data={router.query} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    // paths: { params: { movieId: data.id.toString() } },
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const category = context.params;

  // console.log(category);

  return {
    props: {},
  };
}
