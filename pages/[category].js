import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/ga/index";
import AllMoviesByCategory from "../components/AllMoviesByCategory";
import axios from "axios";
import { getPlaiceholder } from "plaiceholder";

export default function index(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

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

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {
//           category: "Trending",
//         },
//       },
//       {
//         params: {
//           category: "Popular",
//         },
//       },
//       {
//         params: {
//           category: "Upcoming",
//         },
//       },
//       {
//         params: {
//           category: "Top Rated",
//         },
//       },
//     ],
//     fallback: "blocking",
//   };
// }

export async function getServerSideProps(context) {
  const category = context.params;
  const isPageNumberExist = context.query.page ? true : false;

  const url =
    category.category.toLowerCase() !== "trending"
      ? `https://api.themoviedb.org/3/movie/${category.category
          .toLowerCase()
          .replace(/\s/gi, "_")}?api_key=${process.env.NEXT_PUBLIC_API_KEY}${
          isPageNumberExist ? "&page=" + context.query.page : ""
        }`
      : `https://api.themoviedb.org/3/${category.category.toLowerCase()}/movie/week?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }${isPageNumberExist ? "&page=" + context.query.page : ""}`;

  const data = await axios.get(url).then(
    (data) =>
      Promise.all(
        data.data.results.map((one) => {
          return getPlaiceholder(
            `https://image.tmdb.org/t/p/w500${one.poster_path}`
          )
            .then(({ blurhash, img }) => {
              return { ...one, img: { ...img, blurDataURL: blurhash } };
            })
            .catch(() => ({ ...one, img: { blurDataURL: null } }));
        })
      ).then((values) => ({
        success: true,
        data: values,

        total_pages: data.data.total_pages,
        page: data.data.page,
      })),

    () => ({ success: false })
  );

  return {
    props: {
      key: context.params.category,
      data: data.success ? data.data : null,
      total_pages: data.success ? data.total_pages : null,
      page: data.success ? data.page : null,
      url: url,
    },
    // props: null,
  };
}

// export async function getStaticProps(context) {
//   const category = context.params;

//   const url =
//     category.category.toLowerCase() !== "trending"
//       ? `https://api.themoviedb.org/3/movie/${category.category
//           .toLowerCase()
//           .replace(/\s/gi, "_")}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//       : `https://api.themoviedb.org/3/${category.category.toLowerCase()}/movie/week?api_key=${
//           process.env.NEXT_PUBLIC_API_KEY
//         }`;

//   const data = await axios.get(url).then(
//     (data) =>
//       Promise.all(
//         data.data.results.map((one) => {
//           return getPlaiceholder(
//             `https://image.tmdb.org/t/p/w500${one.poster_path}`
//           )
//             .then(({ blurhash, img }) => {
//               return { ...one, img: { ...img, blurDataURL: blurhash } };
//             })
//             .catch(() => ({ ...one, img: { blurDataURL: null } }));
//         })
//       ).then((values) => ({
//         success: true,
//         data: values,

//         total_pages: data.data.total_pages,
//         page: data.data.page,
//       })),

//     () => ({ success: false })
//   );

//   return {
//     props: {
//       key: context.params.category,
//       data: data.success ? data.data : null,
//       total_pages: data.success ? data.total_pages : null,
//       page: data.success ? data.page : null,
//       url: url,
//     },
//     // props: null,
//   };
// }
