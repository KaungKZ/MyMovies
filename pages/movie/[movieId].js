import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "next/error";
import MovieDetail from "../../components/MovieDetail";

export default function index(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState();
  // if (props.errorCode) {
  //   return <Error statusCode={errorCode} />;
  // }

  // console.log(props);

  const router = useRouter();

  // console.log(router.query);

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  function renderYtsMovieDetail() {
    return (
      <a
        href={`https://www.youtube.com/embed/${props.data.ytxData.data.movies[0].yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`}
      >
        Youtube
      </a>
    );
  }

  return (
    <>
      <MovieDetail data={props.data.tmdbData}></MovieDetail>
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
  // console.log(context);
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${context.params.movieId}?api_key=${process.env.API_KEY}&language=en-US`
  );

  const tmdbData = res.data;

  const imdb_code = tmdbData.imdb_id;

  // let errorCode;

  const errorCode = res.statusText === "OK" ? false : res.status;

  // console.log(imdb_code);

  const ytxRes = await axios.get(
    `https://yts.mx/api/v2/list_movies.json?query_term=${imdb_code}`
  );

  // errorCode = ytxRes.statusText === "OK" ? false : ytxRes.status;
  let ytxData = ytxRes.data;

  // console.log(ytxData);
  if (ytxData.status !== "ok" || ytxData.data.movie_count === 0) {
    ytxData = null;
  }

  // ytxData = ytxRes.data;

  return {
    props: { errorCode, data: { tmdbData, ytxData } },
  };
  // console.log(context);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  // return {
  //   props: {},
  // };
}
