import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlurhashCanvas } from "react-blurhash";

export default function MovieList(props) {
  const { movie } = props;

  return (
    <Link href={`/movie/[movieId]`} as={`/movie/${movie.title}-${movie.id}`}>
      <a>
        <div className="category__movie-banner overflow-hidden rounded relative">
          {/* {movie.img.blurDataURL ? ( */}
          <div className="category__movie-canvas relative block h-[340px] xl:h-[360px] lg:h-[380px] transform group-hover:scale-110 transition duration-500">
            <BlurhashCanvas
              punch={1}
              hash={movie.img.blurDataURL?.hash}
              width={movie.img.blurDataURL.height}
              height={movie.img.blurDataURL.width}
              className="absolute left-0 top-0 w-full h-full inset-0"
            />

            <Image
              src={movie.img.src}
              layout="fill"
              // alt={movie.title}
              className="object-cover w-full"
            />
          </div>
          {/* )  */}

          {/* : (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width="auto"
          height="340"
          className="object-cover"
        />
      )
      
      } */}
          <figure className="category__effect-zoe">
            {/* <img src="https://tympanus.net/Development/HoverEffectIdeas/img/25.jpg" alt="img25"/> */}
            <figcaption>
              {/* <h2>
        Creative <span>Zoe</span>
      </h2> */}

              <p className="category__description text-md">
                {movie.overview.length > 125
                  ? movie.overview.substring(125, 0).concat(" ...")
                  : movie.overview}
              </p>
            </figcaption>
          </figure>
        </div>

        <div
          className="category__movie-summary my-3"
          // ref={divRef}
        >
          <h1 className="category__movie-title text-gray-700 font-bold text-base group-hover:underline">
            {movie.title.length > 22
              ? movie.title.substring(0, 22).concat(" ...")
              : movie.title}
          </h1>
          <span className="category__movie-date text-xs text-gray-600">
            {movie.release_date?.split("-")[0] ?? ""}
          </span>
        </div>
      </a>
    </Link>
  );
}
