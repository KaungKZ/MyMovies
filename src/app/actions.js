"use server";

const matchURLs = {
  trending: "https://api.themoviedb.org/3/trending/movie/week",
  // "top-rated": "https://api.themoviedb.org/3/movie/top_rated",
  popular: "https://api.themoviedb.org/3/movie/popular",
  upcoming: "https://api.themoviedb.org/3/movie/upcoming",
};

export default async function handleRequest({ category }) {
  const url = matchURLs[category];
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
}