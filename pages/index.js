import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Error from "next/error";

// -- configuration --

// https://api.themoviedb.org/3/configuration?api_key=82a18ed118951da924967971e5b70de4

// --popular --

// https://api.themoviedb.org/3/movie/popular?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- top rated --

// https://api.themoviedb.org/3/movie/top_rated?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- upcoming movies --

// https://api.themoviedb.org/3/movie/upcoming?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// trending

// https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4

// -- similar movies --

// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// get details

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=82a18ed118951da924967971e5b70de4&language=en-US

// search movies for searchbox

// https://api.themoviedb.org/3/search/movie?api_key=82a18ed118951da924967971e5b70de4&language=en-US&query=the%20avengers&page=1&include_adult=true

// -- torrent api with imdb id --

// https://yts.mx/api/v2/list_movies.json?query_term=tt12801262

// images url sample

// base url                   / file size / file path

// https://image.tmdb.org/t/p/   w500    /kqjL17yufvn9OVLyXYpvtyrFfak.jpg

export default function Home(props) {
  // const router = useRouter();

  if (props.errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <div>
        <h1>Trending</h1>
        {props.data.trending.results.map((movie, index) => {
          return (
            <div key={index}>
              <Link href={`/movie/${movie.id}`}>
                <a>{movie.original_title}</a>
              </Link>
            </div>
          );
        })}
      </div>

      <div>
        <h1>Popular</h1>
        {props.data.popular.results.map((movie, index) => {
          return (
            <div key={index}>
              <Link href={`/movie/${movie.id}`}>
                <a>{movie.original_title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Server Error
// FetchError: request to https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4 failed, reason: connect ETIMEDOUT 65.9.17.69:443

export async function getStaticProps() {
  // try {
  const token = "82a18ed118951da924967971e5b70de4";

  const instance = axios.create({
    baseURL: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`,
    timeout: 7000, // in milliseconds
  });

  const [trendingRes, popularRes] = await Promise.all([
    instance.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);
  const trending = trendingRes.data;
  const popular = popularRes.data;

  console.log(trendingRes);
  const errorCode =
    trendingRes.statusText === "OK" ? false : trendingRes.status;

  // const [trending, popular] = await Promise.all([
  //   trendingRes.json(),
  //   popularRes.json(),
  // ]);

  // if (trendingRes.errno === "ETIMEDOUT" || popularRes.code === "ETIMEDOUT") {
  //   return { notFound: true };
  // }

  // console.log(data);

  return { props: { errorCode, data: { trending, popular } } };
}

// catch (err) {
//   const errorCode = err.statusCode;

//   return { errorCode };
// }
// }
