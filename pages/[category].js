import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/ga/index";
import AllMoviesByCategory from "../components/AllMoviesByCategory";
import axios from "axios";

export default function index(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // console.log(props);

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
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </Head>
      <AllMoviesByCategory data={props} />
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

  // console.log(category.category);

  // console.log(
  //   `https://api.themoviedb.org/3/${category.category.toLowerCase()}/movie/week?api_key=${
  //     process.env.API_KEY
  //   }`
  // );

  const url =
    category.category.toLowerCase() !== "trending"
      ? `https://api.themoviedb.org/3/movie/${category.category
          .toLowerCase()
          .replace(/\s/gi, "_")}?api_key=${process.env.API_KEY}`
      : `https://api.themoviedb.org/3/${category.category.toLowerCase()}/movie/week?api_key=${
          process.env.API_KEY
        }`;

  console.log(url);

  const data = await axios.get(url).then(
    (data) => ({ success: true, data: data.data }),
    () => ({ success: false })
  );

  // console.log(data);

  return {
    props: { data: data.success ? data.data : null },
    // props: null,
  };
}
