"use server";

const matchURLs = {
  trending: "https://api.themoviedb.org/3/trending/movie/week",
  "top-rated": "https://api.themoviedb.org/3/movie/top_rated",
  popular: "https://api.themoviedb.org/3/movie/popular",
  upcoming: "https://api.themoviedb.org/3/movie/upcoming",
};

export const handleRequest = async ({ category, movieId }) => {
  let url;

  if (category === "similar") {
    // let movieId;

    // const simiarURL = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
    url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
  } else {
    url = matchURLs[category];
  }

  try {
    const req = await fetch(
      `${url}?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`
    );

    const body = await req.json();

    return body;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMovieDetail = async (params) => {
  const movieID = params.split("-")[params.split("-").length - 1];

  // get IMDB movie id

  const res = await fetch(
    `${process.env.IMDB_BASE_PATH}movie/${movieID}?api_key=${process.env.IMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Errorwith IMDB api call");
  }

  const body = await res.json();

  const IMDB_id = body.imdb_id;

  const YTXres = await fetch(
    `${process.env.YTS_BASE_PATH}movie_details.json?imdb_id=${IMDB_id}&with_images=true&with_cast=true`
  );

  if (!YTXres.ok) {
    throw new Error("Error with YTX api call");
  }

  const YTXbody = await YTXres.json();

  return [body, YTXbody.data.movie];
};

export const getMoviesByPage = async ({ category, pageNumber }) => {
  const url = matchURLs[category];

  try {
    const req = await fetch(
      `${url}?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=${pageNumber}`
    );

    const body = await req.json();

    return body;
  } catch (err) {
    throw new Error(err);
  }
};

export const searchMoviesByInput = async ({ searchInput }) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.IMDB_API_KEY
  }&language=en-US&query=${
    searchInput === "" ? "emptymovie" : searchInput
  }&page=1&include_adult=false`;

  console.log(url);

  try {
    const req = await fetch(url);

    const body = await req.json();

    return body;
  } catch (err) {
    throw new Error(err);
  }
};
