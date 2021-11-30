import Head from "next/head";
// import { useEffect, useState } from "react";
import axios from "axios";
import Error from "next/error";
import HomeHeader from "../components/HomeHeader";
import HomeMovieCategories from "../components/HomeMovieCategories";
// import { getPlaiceholder } from "plaiceholder";
import { getPlaiceholder } from "plaiceholder";
import { GA_TRACKING_ID } from "../lib/ga/index";

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
  // const [imgBaseUrl, setImgBaseUrl] = useState("");
  // const router = useRouter();

  // console.log(props);

  // console.log(props);

  // if (props.errorCode) {
  //   return <Error statusCode={errorCode} />;
  // }

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/configuration?api_key=82a18ed118951da924967971e5b70de4`
  //     )
  //     .then((data) => {
  //       setImgBaseUrl(data.data.images.base_url);
  //     });
  // }, []);

  // console.log(props);

  return (
    <>
      <Head>
        <title>MyMovies - Search any movies and download</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        {/* <meta charset="UTF-8" /> */}
        <meta
          property="og:title"
          content="MyMovies - Search any movies and download"
        />
        <meta property="og:image" content="https://i.imgur.com/Ye6ZRIN.jpg" />
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
      <HomeHeader></HomeHeader>
      <HomeMovieCategories
        data={props.data.trending}
        title={
          typeof window !== "undefined" && window.innerWidth <= 360
            ? "Trending"
            : "Trending Right Now"
        }
      ></HomeMovieCategories>

      <HomeMovieCategories
        data={props.data.popular}
        title="Popular"
        reverse={true}
      ></HomeMovieCategories>
      <HomeMovieCategories
        data={props.data.upcoming}
        title="Upcoming"
      ></HomeMovieCategories>
      {/* <div>
        <h1>Trending</h1>
        {props.data.trending.results.map((movie, index) => {
          return (
            <div key={index}>
              <Link href={`/movie/${movie.id}`}>
                <a>{movie.title}</a>
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
                <a>{movie.title}</a>
              </Link>
            </div>
          );
        })}
      </div> */}
    </>
  );
}

// Server Error
// FetchError: request to https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4 failed, reason: connect ETIMEDOUT 65.9.17.69:443

export async function getStaticProps() {
  // const { blurhash, img } = await getPlaiceholder(
  //     `https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg`
  //   );

  function makeDate() {
    let yourDate = new Date();
    // yourDate.toISOString().split("T")[0];
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  }

  // console.log(makeDate());

  const urls = [
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.API_KEY
    }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=${makeDate()}&with_watch_monetization_types=flatrate`,
    // `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`,
  ];

  const [trendingRes, popularRes, upcomingRes] = await Promise.all(
    urls.map((url) =>
      axios.get(url).then(
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
          ).then((values) => ({ success: true, data: values })),

        () => ({ success: false })
      )
    )
  ).then((data) => data);

  // console.log(trendingRes);

  const trending = trendingRes.success === false ? null : trendingRes.data;
  const popular = popularRes.success === false ? null : popularRes.data;
  const upcoming = upcomingRes.success === false ? null : upcomingRes.data;

  return { props: { data: { trending, popular, upcoming } } };
}
