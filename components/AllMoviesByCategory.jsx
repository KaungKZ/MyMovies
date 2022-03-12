import React from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BlurhashCanvas } from "react-blurhash";

export default function AllMoviesByCategory(props) {
  // console.log(props);

  const { data } = props;
  const router = useRouter();

  // console.log(data);
  // console.log(router.query.category);
  // const [navbarHeight, setNavbarHeight] = useState(128);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     setNavbarHeight(document.querySelector(".navbar").offsetHeight);
  //   }
  // }, []);

  // console.log(navbarHeight);
  return (
    <div className="movies mt-20">
      <div className="section-wrapper">
        <div className="category__title section-wrapper">
          <div className="category-title-wrapper relative">
            <div className="flex items-center">
              <h1 className="category__title-text font-bold font-secondary text-3xl text-gray-700 underline md:text-[1.75rem] sm:text-2xl">
                {router.query.category}
              </h1>
            </div>

            <div
              // className="category__title-bg"
              className="category__title-bg absolute -left-12 transform -translate-y-2/4 -z-1"
            >
              <Image
                src="/static/assets/section-title-bg-shape.png"
                width="143.38"
                height="130.21"
                // placeholder='blur'
                alt="category title background shape"
              />
            </div>
          </div>
        </div>

        {data ? (
          <div className="movies__wrapper mt-16">
            <div className="movies__list">
              {data.data.map((movie) => {
                return (
                  <Link
                    href={`/movie/[movieId]`}
                    as={`/movie/${movie.title}-${movie.id}`}
                  >
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
                                ? movie.overview
                                    .substring(125, 0)
                                    .concat(" ...")
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
              })}
            </div>
            <div className="movies__pagination"></div>
          </div>
        ) : (
          <>No data for this category</>
        )}
      </div>
    </div>
  );
}
