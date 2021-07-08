import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

// -- configuration --

// https://api.themoviedb.org/3/configuration?api_key=82a18ed118951da924967971e5b70de4

// --popular --

// https://api.themoviedb.org/3/movie/popular?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- top rated --

// https://api.themoviedb.org/3/movie/top_rated?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- upcoming movies --

// https://api.themoviedb.org/3/movie/upcoming?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- similar movies --

// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// -- torrent api with imdb id --

// https://yts.mx/api/v2/list_movies.json?query_term=tt12801262

// images url sample

// base url                   / file size / file path

// https://image.tmdb.org/t/p/   w500    /kqjL17yufvn9OVLyXYpvtyrFfak.jpg

export default function Home() {
  const router = useRouter();

  const token = "82a18ed118951da924967971e5b70de4";

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(data);
  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
          return (
            <Link href={`/person/${index + 1}`} key={index}>
              <a>{person.name}'s Page</a>
            </Link>
          );
        })}
    </>
  );
}
