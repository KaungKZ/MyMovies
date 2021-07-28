import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "next/error";
import MovieDetail from "../../components/MovieDetail";
import { getPlaiceholder } from "plaiceholder";
import Head from "next/head";

export default function index(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState();
  // if (props.errorCode) {
  //   return <Error statusCode={errorCode} />;
  // }

  // console.log(props);

  const router = useRouter();

  // console.log(router);

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  // function renderYtsMovieDetail() {
  //   return (
  //     <a
  //       href={`https://www.youtube.com/embed/${props.data.ytxData.data.movies[0].yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`}
  //     >
  //       Youtube
  //     </a>
  //   );
  // }

  console.log(router.query.movieId.split("-"));

  return (
    <>
      <Head>
        <title>{router.query.movieId.split("-").slice(0, -1)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MovieDetail data={props}></MovieDetail>
    </>
  );
}

export async function getStaticPaths() {
  // const token = "82a18ed118951da924967971e5b70de4";

  // const instance = axios.create({
  //   baseURL: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`,
  //   timeout: 7000, // in milliseconds
  // });

  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
  );

  const data = res.data;

  return {
    paths: data.results.map((d) => ({ params: { movieId: d.id.toString() } })),
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
  // console.log(context);
  // const id = context.params.movieId.split("?id=")[1];
  // movieId = movieId[movieId.length - 1];

  // console.log(context);
  const res = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
    )
    .then(
      async (data) => {
        // console.log(data);
        return getPlaiceholder(
          `https://image.tmdb.org/t/p/w500${data.data.poster_path}`
        ).then(({ blurhash, img }) => {
          return {
            ...data.data,
            img: { ...img, blurDataURL: blurhash },
            success: true,
          };
        });
      },
      () => ({ success: true })
    )
    .then((data) => data);

  // const tmdbData = res;

  // console.log(tmdbData);
  const imdb_code = res.imdb_id;

  // let errorCode;

  // console.log(res);

  // const errorCode = res.success;

  // console.log(imdb_code);

  const ytxRes = await axios.get(
    `https://yts.mx/api/v2/list_movies.json?query_term=${imdb_code}`
  );

  // console.log(ytxRes);

  // errorCode = ytxRes.statusText === "OK" ? false : ytxRes.status;
  let ytxData = ytxRes.data;

  // console.log(ytxData);
  if (ytxData.status !== "ok" || ytxData.data.movie_count === 0) {
    ytxData = null;
  }

  // ytxData = ytxRes.data;

  return {
    props: { success: res.success, data: { res, ytxData } },
  };
  // console.log(context);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  // return {
  //   props: {},
  // };
}
