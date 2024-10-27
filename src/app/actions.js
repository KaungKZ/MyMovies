"use server";

const matchURLs = {
  trending: "https://api.themoviedb.org/3/trending/movie/week",
  // "top-rated": "https://api.themoviedb.org/3/movie/top_rated",
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

  // console.log(url);

  //   console.log(process.env.NEXTAUTH_URL);

  try {
    const req = await fetch(
      `${url}?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`
    );

    const body = await req.json();

    // const data = await Promise.all(
    //   body.results.map(async (one) => {
    //     try {
    //       const src = `https://image.tmdb.org/t/p/w500${one.poster_path}`;

    //       const buffer = await fetch(src).then(async (res) =>
    //         Buffer.from(await res.arrayBuffer())
    //       );

    //       const { base64 } = await getPlaiceholder(buffer);

    //       // console.log(base64);

    //       return { ...one, img: { blurDataURL: base64 } };

    //       // console.log(base64);
    //     } catch (err) {
    //       // console.log(err);
    //       return { ...one, img: { blurDataURL: null } };
    //     }
    //     // return getPlaiceholder(
    //     //   `https://image.tmdb.org/t/p/w500${one.poster_path}`
    //     // )
    //     //   .then(({ blurhash, img }) => {
    //     //     console.log("success");
    //     //     return { ...one, img: { ...img, blurDataURL: blurhash } };
    //     //   })
    //     //   .catch(() => ({ ...one, img: { blurDataURL: null } }));
    //   })
    // );

    return body;
  } catch (err) {
    throw new Error(err);
  }

  // console.log(data);

  // return getPlaiceholder(
  //   `https://image.tmdb.org/t/p/w500${one.poster_path}`
  // ).then(({ blurhash, img }) => {
  //   return { ...one, img: { ...img, blurDataURL: blurhash } };
  // })
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
