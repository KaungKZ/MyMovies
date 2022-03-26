import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "next/error";
import MovieDetail from "../../components/MovieDetail";
import { getPlaiceholder } from "plaiceholder";
import Head from "next/head";
import Script from "next/script";

import { GA_TRACKING_ID } from "../../lib/ga/index";
import HomeMovieCategories from "../../components/HomeMovieCategories";
import { useRouter } from "next/router";

// import { useRouter } from "next/router";

export default function index(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // console.log(props.data.similarRes.data);

  return (
    <>
      <Head>
        <title>{router.query.movieId.split("-").slice(0, -1)}</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        {/* <meta charset="UTF-8" /> */}

        <meta
          property="og:title"
          content={router.query.movieId.split("-").slice(0, -1)}
        />
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
      {props.data.detailRes ? (
        <MovieDetail
          tmdbData={props.data.detailRes}
          ytxData={props.data.ytxData}
        ></MovieDetail>
      ) : (
        "Detail not found"
      )}
      {props.data.similarRes && props.data.similarRes.data.length > 5 && (
        <HomeMovieCategories
          data={props.data.similarRes.data}
          title="Similiar Movies"
        ></HomeMovieCategories>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(
    // `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    // `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.API_KEY}&language=en-US`
  );

  const data = res.data;

  return {
    paths: data.results.map((d) => ({ params: { movieId: d.id.toString() } })),
    // paths: { params: { movieId: data.id.toString() } },
    fallback: "blocking",
  };
}

// export async function getStaticProps(context) {
//   console.log(context.params); // return { params: {movieId: 'Mortal Kombat' }, ... }

//   return {
//     props: {},
//   };
// }
// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export async function getStaticProps(context) {
  const [movieId] = context.params.movieId.split("-").slice(-1);

  // console.log(movieId);

  const urls = [
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  ];

  console.log(urls);

  const [detailRes, similarRes] = await Promise.all(
    urls.map((url) =>
      axios.get(url).then(
        (data) =>
          Promise.all(
            (data.data.results ? data.data.results : [data.data]).map((one) => {
              return getPlaiceholder(
                `https://image.tmdb.org/t/p/w500${one.poster_path}`
              )
                .then(({ blurhash, img }) => {
                  // console.log("success", img);
                  return { ...one, img: { ...img, blurDataURL: blurhash } };
                })
                .catch(() => {
                  // console.log("error", one);
                  return { ...one, img: { blurDataURL: null } };
                });
            })
          ).then((values) => ({ success: true, data: values })),
        () => ({ success: false })
      )
    )
  ).then((data) => {
    const detail =
      data[0].success === false
        ? null
        : { success: data[0].success, ...data[0].data[0] };
    const similar =
      data[1].success === false || !data[1].data.length ? null : data[1];
    // console.log(movieId, similar.data);
    return [detail, similar];
  });

  const imdb_code = detailRes ? detailRes.imdb_id : "";

  const ytxRes = await axios.get(
    `https://yts.mx/api/v2/list_movies.json?query_term=${imdb_code}`
  );

  let ytxData = ytxRes.data;

  if (ytxData.status !== "ok" || ytxData.data.movie_count === 0) {
    ytxData = null;
  }

  // console.log(detailRes);
  return {
    props: { data: { detailRes, similarRes, ytxData } },
  };
}
